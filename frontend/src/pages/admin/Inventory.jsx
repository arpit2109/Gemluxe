import { useState, useEffect } from 'react';
import api from '../../api/axios';
import { Edit } from 'lucide-react';
import { Link } from 'react-router-dom';

const Inventory = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            const response = await api.get('/products/');
            setProducts(response.data);
        };
        fetchProducts();
    }, []);

    useEffect(() => {
        // WebSocket connection for real-time updates
        // In a real app, we might have a global inventory channel or one per product
        // For simplicity, we'll just listen to updates if we were subscribed to a general channel
        // But our backend currently broadcasts to specific product groups. 
        // To make this work efficiently, we'd need a 'global_inventory' group.
        // For now, we'll skip the complex WS implementation here and rely on polling or individual subscriptions
        // Or better, let's implement a simple polling for the table to keep it fresh

        const interval = setInterval(async () => {
            const response = await api.get('/products/');
            setProducts(response.data);
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="p-8">
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-serif font-bold text-charcoal">Inventory</h2>
                <Link to="/admin/products/new" className="bg-gold text-white px-4 py-2 rounded hover:bg-yellow-600 transition-colors">
                    Add Product
                </Link>
            </div>

            <div className="bg-white shadow-sm rounded-lg overflow-hidden border border-gray-200">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SKU</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Metal</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {products.map((product) => (
                            <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <div className="h-10 w-10 flex-shrink-0">
                                            <img className="h-10 w-10 rounded-full object-cover" src={product.images[0]?.image || 'https://via.placeholder.com/40'} alt="" />
                                        </div>
                                        <div className="ml-4">
                                            <div className="text-sm font-medium text-gray-900">{product.name}</div>
                                            <div className="text-sm text-gray-500">{product.category}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.sku}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.metal_type}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${product.price}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${product.inventory.stock_quantity > 10 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                        {product.inventory.stock_quantity}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <Link to={`/admin/products/${product.id}/edit`} className="text-gold hover:text-charcoal">
                                        <Edit className="h-5 w-5" />
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Inventory;
