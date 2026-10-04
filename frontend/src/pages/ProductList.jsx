import { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import api from '../api/axios';
import { Filter } from 'lucide-react';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({ category: '', metal_type: '' });

    useEffect(() => {
        fetchProducts();
    }, [filters]);

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const params = {};
            if (filters.category) params.category = filters.category;
            if (filters.metal_type) params.metal_type = filters.metal_type;

            const response = await api.get('products/', { params });
            setProducts(response.data);
        } catch (error) {
            console.error("Failed to fetch products", error);
        } finally {
            setLoading(false);
        }
    };

    const handleFilterChange = (e) => {
        setFilters({ ...filters, [e.target.name]: e.target.value });
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="flex flex-col md:flex-row justify-between items-center mb-8">
                <h1 className="text-3xl font-serif text-charcoal">Our Collection</h1>

                <div className="flex space-x-4 mt-4 md:mt-0">
                    <div className="relative">
                        <select
                            name="category"
                            onChange={handleFilterChange}
                            className="appearance-none bg-white border border-gray-300 text-charcoal py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:border-gold"
                        >
                            <option value="">All Categories</option>
                            <option value="RING">Rings</option>
                            <option value="NECKLACE">Necklaces</option>
                            <option value="EARRING">Earrings</option>
                            <option value="BRACELET">Bracelets</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                            <Filter className="h-4 w-4" />
                        </div>
                    </div>

                    <div className="relative">
                        <select
                            name="metal_type"
                            onChange={handleFilterChange}
                            className="appearance-none bg-white border border-gray-300 text-charcoal py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:border-gold"
                        >
                            <option value="">All Metals</option>
                            <option value="GOLD">Gold</option>
                            <option value="PLATINUM">Platinum</option>
                            <option value="ROSE_GOLD">Rose Gold</option>
                            <option value="WHITE_GOLD">White Gold</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                            <Filter className="h-4 w-4" />
                        </div>
                    </div>
                </div>
            </div>

            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold"></div>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {products.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default ProductList;
