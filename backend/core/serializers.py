from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Product, ProductImage, Inventory, Order, OrderItem, Address, OTPSession
import re

User = get_user_model()

class OTPRequestSerializer(serializers.Serializer):
    phone_number = serializers.CharField(max_length=15)

    def validate_phone_number(self, value):
        # E.164 format validation
        if not re.match(r'^\+?1?\d{9,15}$', value):
            raise serializers.ValidationError("Invalid phone number format. Use E.164 format.")
        return value

class OTPVerifySerializer(serializers.Serializer):
    phone_number = serializers.CharField(max_length=15)
    otp_code = serializers.CharField(max_length=6)

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'phone_number', 'email']

class ProductImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImage
        fields = ['id', 'image', 'display_order']

class InventorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Inventory
        fields = ['stock_quantity', 'reserved_quantity']

class ProductSerializer(serializers.ModelSerializer):
    images = ProductImageSerializer(many=True, read_only=True)
    inventory = InventorySerializer(read_only=True)
    
    class Meta:
        model = Product
        fields = ['id', 'name', 'description', 'price', 'sku', 'metal_type', 'category', 'images', 'inventory']

class AdminProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['id', 'name', 'description', 'price', 'sku', 'metal_type', 'category']

class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        fields = '__all__'
        read_only_fields = ['user']

class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = ['product', 'quantity', 'price_at_purchase']

class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True)
    address_id = serializers.UUIDField(write_only=True)

    class Meta:
        model = Order
        fields = ['id', 'status', 'total_amount', 'items', 'address_id', 'created_at']
        read_only_fields = ['user', 'total_amount', 'status', 'payment_intent_id']

    def create(self, validated_data):
        items_data = validated_data.pop('items')
        address_id = validated_data.pop('address_id')
        user = self.context['request'].user
        
        # Calculate total and verify stock
        total_amount = 0
        
        # We need to handle this atomically in the view, but here we prepare data
        # Actually, for atomic creation, we should do it here or in view. 
        # Doing it here allows standard DRF create usage.
        
        # Fetch address
        try:
            address = Address.objects.get(id=address_id, user=user)
        except Address.DoesNotExist:
            raise serializers.ValidationError("Invalid address ID")

        order = Order.objects.create(user=user, address=address, total_amount=0, **validated_data)
        
        for item_data in items_data:
            product = item_data['product']
            quantity = item_data['quantity']
            
            # Check stock
            if product.inventory.stock_quantity - product.inventory.reserved_quantity < quantity:
                raise serializers.ValidationError(f"Insufficient stock for {product.name}")
            
            # Reserve stock (Optimistic locking handled in view or here?)
            # Simple update for now, view should handle transaction
            product.inventory.reserved_quantity += quantity
            product.inventory.save()
            
            # Broadcast update
            from channels.layers import get_channel_layer
            from asgiref.sync import async_to_sync
            
            channel_layer = get_channel_layer()
            async_to_sync(channel_layer.group_send)(
                f'inventory_{product.id}',
                {
                    'type': 'stock_update',
                    'stock': product.inventory.stock_quantity - product.inventory.reserved_quantity
                }
            )
            
            price = product.price
            total_amount += price * quantity
            
            OrderItem.objects.create(
                order=order,
                product=product,
                quantity=quantity,
                price_at_purchase=price,
                product_snapshot={
                    'name': product.name,
                    'sku': product.sku,
                    'metal': product.metal_type
                }
            )
            
        order.total_amount = total_amount
        order.save()
        
        return order
