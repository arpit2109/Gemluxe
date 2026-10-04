from django.urls import re_path
from . import consumers

websocket_urlpatterns = [
    re_path(r'ws/inventory/(?P<product_id>[0-9a-f-]+)/$', consumers.InventoryConsumer.as_asgi()),
]
