import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Package, ShoppingBag, LogOut } from 'lucide-react';

const AdminLayout = () => {
    const location = useLocation();

    const isActive = (path) => location.pathname === path;

    const navItems = [
        { path: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
        { path: '/admin/inventory', icon: Package, label: 'Inventory' },
        { path: '/admin/orders', icon: ShoppingBag, label: 'Orders' },
    ];

    return (
        <div className="flex h-screen bg-gray-50 font-inter">
            {/* Sidebar */}
            <aside className="w-64 bg-charcoal-900 text-white flex flex-col shadow-xl">
                <div className="p-6 border-b border-charcoal-800">
                    <h1 className="text-2xl font-playfair text-gold-400 font-bold">GemLuxe</h1>
                    <p className="text-xs text-gray-400 mt-1">Admin Portal</p>
                </div>

                <nav className="flex-1 p-4 space-y-2">
                    {navItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${isActive(item.path)
                                    ? 'bg-gold-500 text-charcoal-900 font-medium shadow-md'
                                    : 'text-gray-300 hover:bg-charcoal-800 hover:text-gold-400'
                                }`}
                        >
                            <item.icon size={20} />
                            <span>{item.label}</span>
                        </Link>
                    ))}
                </nav>

                <div className="p-4 border-t border-charcoal-800">
                    <button className="flex items-center gap-3 px-4 py-3 w-full text-left text-red-400 hover:bg-charcoal-800 rounded-lg transition-colors">
                        <LogOut size={20} />
                        <span>Logout</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto bg-gray-50 p-8">
                <Outlet />
            </main>
        </div>
    );
};

export default AdminLayout;
