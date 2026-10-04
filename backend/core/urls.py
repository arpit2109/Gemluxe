from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import AuthViewSet, ProductViewSet, OrderViewSet, RecommendationView, AdminDashboardViewSet, AdminProductViewSet

router = DefaultRouter()
router.register(r'auth', AuthViewSet, basename='auth')
router.register(r'products', ProductViewSet, basename='products')
router.register(r'orders', OrderViewSet, basename='orders')
router.register(r'admin/dashboard', AdminDashboardViewSet, basename='admin-dashboard')
router.register(r'admin/products', AdminProductViewSet, basename='admin-products')

urlpatterns = [
    path('', include(router.urls)),
    path('recommendations/personalized/', RecommendationView.as_view(), name='personalized-recommendations'),
]
