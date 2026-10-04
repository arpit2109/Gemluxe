import json
from channels.generic.websocket import AsyncWebsocketConsumer

class InventoryConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.product_id = self.scope['url_route']['kwargs']['product_id']
        self.room_group_name = f'inventory_{self.product_id}'

        # Join room group
        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )

        await self.accept()

    async def disconnect(self, close_code):
        # Leave room group
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )

    # Receive message from room group
    async def stock_update(self, event):
        stock = event['stock']

        # Send message to WebSocket
        await self.send(text_data=json.dumps({
            'type': 'stock_update',
            'stock': stock
        }))
