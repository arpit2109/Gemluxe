from rest_framework import viewsets, status, generics, filters
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.db import transaction
from django.utils import timezone
from django.shortcuts import get_object_or_404
from django_filters.rest_framework import DjangoFilterBackend
from .models import User, Product, Order, OTPSession, ProductView, Wishlist
from .serializers import (
    UserSerializer, OTPRequestSerializer, OTPVerifySerializer,
    ProductSerializer, OrderSerializer
)
import random
import uuid
from datetime import timedelta
from rest_framework_simplejwt.tokens import RefreshToken

class AuthViewSet(viewsets.ViewSet):
    permission_classes = [AllowAny]

    @action(detail=False, methods=['post'], url_path='otp/request')
    def request_otp(self, request):
        serializer = OTPRequestSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        phone = serializer.validated_data['phone_number']
        
        # Generate OTP (Mocking for now, in prod use SMS gateway)
        otp_code = str(random.randint(100000, 999999))
        expires_at = timezone.now() + timedelta(minutes=5)
        
        OTPSession.objects.create(
            phone_number=phone,
            otp_code=otp_code,
            expires_at=expires_at
        )
        
        import sys
        print(f"\n\n{'='*20}\nDEBUG OTP: {otp_code}\n{'='*20}\n\n")
        sys.stdout.flush()
        
        # In a real app, send SMS here.
        # For demo, return it in response (DEBUG only) or log it.
        return Response({"message": "OTP sent", "debug_otp": otp_code})

    @action(detail=False, methods=['post'], url_path='otp/verify')
    def verify_otp(self, request):
        serializer = OTPVerifySerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        phone = serializer.validated_data['phone_number']
        code = serializer.validated_data['otp_code']
        
        session = OTPSession.objects.filter(
            phone_number=phone,
            otp_code=code,
            expires_at__gt=timezone.now(),
            is_verified=False
        ).first()
        
        if not session:
            return Response({"error": "Invalid or expired OTP"}, status=status.HTTP_400_BAD_REQUEST)
        
        session.is_verified = True
        session.save()
        
        user, created = User.objects.get_or_create(phone_number=phone, defaults={'username': phone})
        
        refresh = RefreshToken.for_user(user)
        
        return Response({
            'refresh': str(refresh),
            'access': str(refresh.access_token),
            'user': UserSerializer(user).data
        })

class ProductViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Product.objects.all().select_related('inventory').prefetch_related('images')
    serializer_class = ProductSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['category', 'metal_type']
    search_fields = ['name', 'description', 'sku']
    ordering_fields = ['price', 'created_at']

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        
        # Track view
        if request.user.is_authenticated:
            ProductView.objects.create(user=request.user, product=instance)
        elif request.session.session_key:
             ProductView.objects.create(session_key=request.session.session_key, product=instance)
             
        serializer = self.get_serializer(instance)
        return Response(serializer.data)

class RecommendationView(generics.ListAPIView):
    serializer_class = ProductSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        # Logic: Last 10 views -> Category affinity -> Filter exclusions
        user = self.request.user
        if not user.is_authenticated:
            return Product.objects.none() # Or popular items
            
        recent_views = ProductView.objects.filter(user=user).order_by('-viewed_at')[:10]
        if not recent_views.exists():
            return Product.objects.all()[:5] # Fallback
            
        # Simple affinity: most viewed category
        categories = [v.product.category for v in recent_views]
        most_common_category = max(set(categories), key=categories.count)
        
        # Exclude already viewed
        viewed_ids = [v.product.id for v in recent_views]
        
        return Product.objects.filter(category=most_common_category).exclude(id__in=viewed_ids)[:5]

class OrderViewSet(viewsets.ModelViewSet):
    serializer_class = OrderSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Order.objects.filter(user=self.request.user)

    @transaction.atomic
    def create(self, request, *args, **kwargs):
        return super().create(request, *args, **kwargs)

from rest_framework.permissions import IsAdminUser
from django.db.models import Sum, Count
from django.db.models.functions import TruncDate
from .serializers import AdminProductSerializer

class AdminDashboardViewSet(viewsets.ViewSet):
    permission_classes = [IsAdminUser]

    @action(detail=False, methods=['get'])
    def sales(self, request):
        # Get current month's sales
        now = timezone.now()
        start_of_month = now.replace(day=1, hour=0, minute=0, second=0, microsecond=0)
        
        sales_data = (
            Order.objects.filter(
                created_at__gte=start_of_month,
                status__in=[Order.Status.PAID, Order.Status.SHIPPED, Order.Status.DELIVERED]
            )
            .annotate(date=TruncDate('created_at'))
            .values('date')
            .annotate(total=Sum('total_amount'))
            .order_by('date')
        )
        
        # Format for frontend
        formatted_data = [
            {
                "date": item['date'].strftime('%Y-%m-%d'),
                "total": float(item['total'])
            }
            for item in sales_data
        ]
        
        return Response(formatted_data)

class AdminProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = AdminProductSerializer
    permission_classes = [IsAdminUser]
