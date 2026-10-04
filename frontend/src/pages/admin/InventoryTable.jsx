import React, { useEffect, useState, useRef } from 'react';
import { Edit, AlertCircle, CheckCircle } from 'lucide-react';
import axios from 'axios';

const InventoryTable = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    // We'll keep track of websocket connections
    const websockets = useRef({});

    useEffect(() => {
        fetchProducts();
        return () => {
            // Cleanup websockets
            Object.values(websockets.current).forEach(ws => ws.close());
        };
    }, []);

    const fetchProducts = async () => {
        try {
            // Mock API call
            // const response = await axios.get('/api/admin/products');
            // setProducts(response.data);

            // Mock data for now
            const mockProducts = [
                { id: '1', name: 'Eternity Band', sku: 'SKU-1000', stock_quantity: 12, reserved_quantity: 2, price: 5000 },
                { id: '2', name: 'Solitaire Diamond', sku: 'SKU-1001', stock_quantity: 5, reserved_quantity: 0, price: 12000 },
                { id: '3', name: 'Vintage Halo', sku: 'SKU-1002', stock_quantity: 0, reserved_quantity: 0, price: 8500 },
                { id: '4', name: 'Classic Tennis', sku: 'SKU-1003', stock_quantity: 20, reserved_quantity: 5, price: 15000 },
            ];
            setProducts(mockProducts);
            setLoading(false);

            // Initialize WebSockets for each product
            mockProducts.forEach(product => {
                connectWebSocket(product.id);
            });

        } catch (error) {
            console.error("Error fetching products:", error);
            setLoading(false);
        }
    };

    const connectWebSocket = (productId) => {
        if (websockets.current[productId]) return;

        // Adjust URL based on environment
        const wsUrl = `ws://localhost:8000/ws/inventory/${productId}/`;
        const ws = new WebSocket(wsUrl);

        ws.onmessage = (event) => {
            const data = JSON.parse(event.data);
            if (data.type === 'stock_update') {
                updateProductStock(productId, data.stock);
            }
        };

        ws.onclose = () => {
            // Simple reconnect logic could go here
            console.log(`WS closed for ${productId}`);
        };

        websockets.current[productId] = ws;
    };

    const updateProductStock = (productId, newStock) => {
        setProducts(prev => prev.map(p =>
            p.id === productId ? { ...p, stock_quantity: newStock } : p
        ));
    };

    if (loading) return <div className="p-8">Loading inventory...</div>;

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                <h2 className="text-xl font-playfair font-bold text-charcoal-900">Inventory Management</h2>
                <button className="bg-gold-500 text-white px-4 py-2 rounded-lg hover:bg-gold-600 transition-colors">
                    Add Product
                </button>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 text-gray-500 font-medium text-sm uppercase tracking-wider">
                        <tr>
                            <th className="px-6 py-4">Product Name</th>
                            <th className="px-6 py-4">SKU</th>
                            <th className="px-6 py-4">Price</th>
                            <th className="px-6 py-4">Stock Level</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {products.map((product) => (
                            <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4 font-medium text-charcoal-900">{product.name}</td>
                                <td className="px-6 py-4 text-gray-500">{product.sku}</td>
                                <td className="px-6 py-4 text-charcoal-900">${product.price.toLocaleString()}</td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-2">
                                        <span className={`font-bold ${product.stock_quantity < 5 ? 'text-red-500' : 'text-charcoal-900'}`}>
                                            {product.stock_quantity}
                                        </span>
                                        {product.reserved_quantity > 0 && (
                                            <span className="text-xs text-gray-400">({product.reserved_quantity} reserved)</span>
                                        )}
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    {product.stock_quantity > 0 ? (
                                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                            <CheckCircle size={12} /> In Stock
                                        </span>
                                    ) : (
                                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                                            <AlertCircle size={12} /> Out of Stock
                                        </span>
                                    )}
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <button className="text-gray-400 hover:text-gold-600 transition-colors">
                                        <Edit size={18} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default InventoryTable;
