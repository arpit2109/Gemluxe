from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from core.models import Product, Inventory, Order, OrderItem, Address, ProductImage
from django.utils import timezone
from datetime import timedelta
import random
import uuid

User = get_user_model()

class Command(BaseCommand):
    help = 'Seeds the database with initial data'

    def handle(self, *args, **kwargs):
        self.stdout.write('Seeding database...')
        
        # 1. Create Users
        admin, _ = User.objects.get_or_create(
            username='admin',
            defaults={
                'email': 'admin@gemluxe.com',
                'is_staff': True,
                'is_superuser': True,
                'phone_number': '+19999999999'
            }
        )
        admin.set_password('admin123')
        admin.save()

        customer, _ = User.objects.get_or_create(
            username='customer',
            defaults={
                'email': 'customer@gemluxe.com',
                'phone_number': '+18888888888'
            }
        )
        customer.set_password('customer123')
        customer.save()

        # 2. Create Products
        metals = [Product.MetalType.GOLD, Product.MetalType.PLATINUM, Product.MetalType.WHITE_GOLD, Product.MetalType.ROSE_GOLD]
        categories = [Product.Category.RING, Product.Category.NECKLACE, Product.Category.EARRING, Product.Category.BRACELET]
        
        product_names = [
            "Eternity Band", "Solitaire Diamond", "Vintage Halo", "Classic Tennis",
            "Royal Sapphire", "Emerald Cut", "Pear Drop", "Infinity Loop",
            "Celestial Pendant", "Art Deco Cuff", "Modern Choker", "Stud Earrings",
            "Hoop Earrings", "Drop Earrings", "Charm Bracelet", "Bangle",
            "Signet Ring", "Locket", "Chain Link", "Pearl Strand"
        ]

        products = []
        for i, name in enumerate(product_names):
            metal = metals[i % len(metals)]
            category = categories[i % len(categories)]
            price = random.randint(500, 5000) * 10 # 5000 to 50000
            
            product, created = Product.objects.get_or_create(
                sku=f'SKU-{1000+i}',
                defaults={
                    'name': f"{metal.title().replace('_', ' ')} {name}",
                    'description': f"A luxurious {metal.lower().replace('_', ' ')} {category.lower()} featuring exquisite craftsmanship.",
                    'price': price,
                    'metal_type': metal,
                    'category': category
                }
            )
            
            # Inventory
            Inventory.objects.get_or_create(
                product=product,
                defaults={
                    'stock_quantity': random.randint(5, 50),
                    'reserved_quantity': 0
                }
            )
            
            # Images (Placeholder)
            if created:
                # Using a placeholder service or static path
                ProductImage.objects.create(
                    product=product,
                    image='products/placeholder.jpg', # Ensure this exists or handle in frontend
                    display_order=0
                )
            
            products.append(product)

        # 3. Create Address for Customer
        address, _ = Address.objects.get_or_create(
            user=customer,
            defaults={
                'street_address': '123 Luxury Lane',
                'city': 'Beverly Hills',
                'state': 'CA',
                'postal_code': '90210',
                'country': 'USA',
                'is_default': True
            }
        )

        # 4. Create Past Orders (for Analytics)
        # Generate orders for the current month
        now = timezone.now()
        start_of_month = now.replace(day=1, hour=0, minute=0, second=0, microsecond=0)
        
        for i in range(30): # Create 30 random orders
            order_date = start_of_month + timedelta(days=random.randint(0, (now - start_of_month).days or 1))
            
            # Randomly select products
            order_items_count = random.randint(1, 3)
            selected_products = random.sample(products, order_items_count)
            
            total_amount = 0
            
            order = Order.objects.create(
                user=customer,
                address=address,
                status=Order.Status.PAID,
                total_amount=0, # Will update
                created_at=order_date
            )
            # Hack to override auto_now_add
            order.created_at = order_date
            order.save()
            
            for product in selected_products:
                quantity = random.randint(1, 2)
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

        self.stdout.write(self.style.SUCCESS('Database seeded successfully!'))
