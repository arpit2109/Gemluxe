import React, { useState } from 'react';
import { Package, MapPin, Heart, LogOut } from 'lucide-react';

const UserProfile = () => {
    const [activeTab, setActiveTab] = useState('orders');

    const tabs = [
        { id: 'orders', label: 'My Orders', icon: Package },
        { id: 'addresses', label: 'Addresses', icon: MapPin },
        { id: 'wishlist', label: 'Wishlist', icon: Heart },
    ];

    return (
        <div className="container mx-auto px-6 py-12 pt-24">
            <div className="max-w-5xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-playfair font-bold text-charcoal-900">My Account</h1>
                    <p className="text-gray-500 mt-1">Manage your orders and preferences.</p>
                </div>

                <div className="flex flex-col md:flex-row gap-8">
                    {/* Sidebar Navigation */}
                    <aside className="w-full md:w-64 flex-shrink-0">
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                            {tabs.map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`w-full flex items-center gap-3 px-6 py-4 text-left transition-colors ${activeTab === tab.id
                                            ? 'bg-gold-50 text-gold-700 font-medium border-l-4 border-gold-500'
                                            : 'text-gray-600 hover:bg-gray-50 border-l-4 border-transparent'
                                        }`}
                                >
                                    <tab.icon size={20} />
                                    <span>{tab.label}</span>
                                </button>
                            ))}
                            <div className="border-t border-gray-100 mt-2">
                                <button className="w-full flex items-center gap-3 px-6 py-4 text-left text-red-500 hover:bg-red-50 transition-colors">
                                    <LogOut size={20} />
                                    <span>Sign Out</span>
                                </button>
                            </div>
                        </div>
                    </aside>

                    {/* Content Area */}
                    <div className="flex-1 bg-white rounded-xl shadow-sm border border-gray-100 p-8 min-h-[400px]">
                        {activeTab === 'orders' && <OrdersTab />}
                        {activeTab === 'addresses' && <AddressesTab />}
                        {activeTab === 'wishlist' && <WishlistTab />}
                    </div>
                </div>
            </div>
        </div>
    );
};

const OrdersTab = () => (
    <div className="space-y-6">
        <h2 className="text-xl font-playfair font-bold text-charcoal-900 mb-6">Order History</h2>
        {/* Mock Order */}
        {[1, 2].map((order) => (
            <div key={order} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <p className="font-medium text-charcoal-900">Order #GL-883{order}</p>
                        <p className="text-sm text-gray-500">Placed on Nov 18, 2023</p>
                    </div>
                    <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                        Delivered
                    </span>
                </div>
                <div className="flex items-center gap-4 border-t border-gray-100 pt-4">
                    <div className="w-16 h-16 bg-gray-100 rounded-md overflow-hidden">
                        <img src="https://via.placeholder.com/100" alt="Product" className="w-full h-full object-cover" />
                    </div>
                    <div>
                        <p className="font-medium text-charcoal-900">Diamond Eternity Band</p>
                        <p className="text-sm text-gray-500">Qty: 1</p>
                    </div>
                    <div className="ml-auto font-medium text-charcoal-900">$5,000.00</div>
                </div>
            </div>
        ))}
    </div>
);

const AddressesTab = () => (
    <div>
        <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-playfair font-bold text-charcoal-900">Saved Addresses</h2>
            <button className="text-gold-600 font-medium hover:text-gold-700">Add New</button>
        </div>
        <div className="border border-gray-200 rounded-lg p-6 relative">
            <span className="absolute top-4 right-4 text-xs font-bold text-gold-600 bg-gold-50 px-2 py-1 rounded">DEFAULT</span>
            <h3 className="font-medium text-charcoal-900 mb-1">John Doe</h3>
            <p className="text-gray-600 text-sm">123 Luxury Lane</p>
            <p className="text-gray-600 text-sm">Beverly Hills, CA 90210</p>
            <p className="text-gray-600 text-sm">United States</p>
            <div className="mt-4 flex gap-4 text-sm">
                <button className="text-charcoal-900 hover:underline">Edit</button>
                <button className="text-red-500 hover:underline">Delete</button>
            </div>
        </div>
    </div>
);

const WishlistTab = () => (
    <div>
        <h2 className="text-xl font-playfair font-bold text-charcoal-900 mb-6">My Wishlist</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[1, 2, 3].map((item) => (
                <div key={item} className="border border-gray-200 rounded-lg overflow-hidden group">
                    <div className="aspect-square bg-gray-100 relative">
                        <img src="https://via.placeholder.com/200" alt="Wishlist Item" className="w-full h-full object-cover" />
                        <button className="absolute top-2 right-2 bg-white p-2 rounded-full shadow-md text-red-500 hover:bg-red-50">
                            <Heart size={16} fill="currentColor" />
                        </button>
                    </div>
                    <div className="p-4">
                        <h3 className="font-medium text-charcoal-900 truncate">Vintage Halo Ring</h3>
                        <p className="text-gold-600 font-medium mt-1">$8,500.00</p>
                        <button className="w-full mt-3 bg-charcoal-900 text-white py-2 rounded-lg text-sm hover:bg-charcoal-800 transition-colors">
                            Add to Cart
                        </button>
                    </div>
                </div>
            ))}
        </div>
    </div>
);

export default UserProfile;
