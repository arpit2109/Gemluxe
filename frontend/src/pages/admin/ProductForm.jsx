import React, { useState, useEffect } from 'react';
import { Save, X, Upload } from 'lucide-react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const ProductForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEditMode = !!id;

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        sku: '',
        metal_type: 'GOLD',
        category: 'RING',
        stock_quantity: 0,
        image: null
    });

    const [previewUrl, setPreviewUrl] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (isEditMode) {
            fetchProduct(id);
        }
    }, [id]);

    const fetchProduct = async (productId) => {
        try {
            // const response = await axios.get(`/api/products/${productId}`);
            // setFormData(response.data);
            // Mock data
            setFormData({
                name: 'Eternity Band',
                description: 'A beautiful ring.',
                price: 5000,
                sku: 'SKU-1000',
                metal_type: 'GOLD',
                category: 'RING',
                stock_quantity: 12,
                image: null
            });
        } catch (error) {
            console.error("Error fetching product:", error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData(prev => ({ ...prev, image: file }));
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const data = new FormData();
            Object.keys(formData).forEach(key => {
                if (key === 'image' && !formData.image) return;
                data.append(key, formData[key]);
            });

            if (isEditMode) {
                // await axios.patch(`/api/admin/products/${id}/`, data);
            } else {
                // await axios.post('/api/admin/products/', data);
            }

            // Simulate delay
            await new Promise(resolve => setTimeout(resolve, 1000));

            navigate('/admin/inventory');
        } catch (error) {
            console.error("Error saving product:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                <h2 className="text-xl font-playfair font-bold text-charcoal-900">
                    {isEditMode ? 'Edit Product' : 'Add New Product'}
                </h2>
                <button
                    onClick={() => navigate('/admin/inventory')}
                    className="text-gray-400 hover:text-charcoal-900 transition-colors"
                >
                    <X size={24} />
                </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent outline-none transition-all"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">SKU</label>
                            <input
                                type="text"
                                name="sku"
                                value={formData.sku}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent outline-none transition-all"
                                required
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Price ($)</label>
                                <input
                                    type="number"
                                    name="price"
                                    value={formData.price}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent outline-none transition-all"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Stock</label>
                                <input
                                    type="number"
                                    name="stock_quantity"
                                    value={formData.stock_quantity}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent outline-none transition-all"
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Metal Type</label>
                            <select
                                name="metal_type"
                                value={formData.metal_type}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent outline-none transition-all"
                            >
                                <option value="GOLD">Gold</option>
                                <option value="PLATINUM">Platinum</option>
                                <option value="ROSE_GOLD">Rose Gold</option>
                                <option value="WHITE_GOLD">White Gold</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                            <select
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent outline-none transition-all"
                            >
                                <option value="RING">Ring</option>
                                <option value="NECKLACE">Necklace</option>
                                <option value="EARRING">Earring</option>
                                <option value="BRACELET">Bracelet</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Product Image</label>
                            <div className="border-2 border-dashed border-gray-200 rounded-lg p-4 text-center hover:bg-gray-50 transition-colors cursor-pointer relative">
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                />
                                {previewUrl ? (
                                    <img src={previewUrl} alt="Preview" className="h-32 mx-auto object-contain" />
                                ) : (
                                    <div className="py-4">
                                        <Upload className="mx-auto text-gray-400 mb-2" size={24} />
                                        <p className="text-sm text-gray-500">Click to upload image</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows="4"
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent outline-none transition-all"
                        required
                    />
                </div>

                <div className="flex justify-end pt-4 border-t border-gray-100">
                    <button
                        type="button"
                        onClick={() => navigate('/admin/inventory')}
                        className="px-6 py-2 text-gray-600 hover:bg-gray-100 rounded-lg mr-4 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={loading}
                        className="flex items-center gap-2 px-6 py-2 bg-gold-500 text-white rounded-lg hover:bg-gold-600 transition-colors disabled:opacity-50"
                    >
                        <Save size={18} />
                        {loading ? 'Saving...' : 'Save Product'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ProductForm;
