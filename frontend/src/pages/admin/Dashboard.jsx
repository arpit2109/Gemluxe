import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { DollarSign, ShoppingBag, TrendingUp, Users } from 'lucide-react';
import axios from 'axios';

const Dashboard = () => {
    const [salesData, setSalesData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({
        totalRevenue: 0,
        totalOrders: 0,
        activeCustomers: 0, // Mocked for now
    });

    useEffect(() => {
        const fetchStats = async () => {
            try {
                // In a real app, use an axios instance with auth headers
                // const response = await axios.get('/api/admin/dashboard/sales');
                // For now, using the mocked data from the seed or endpoint

                // Mocking the API call for demonstration until we connect fully
                // const data = response.data;

                // Temporary Mock Data matching the seed logic
                const mockData = Array.from({ length: 30 }, (_, i) => {
                    const date = new Date();
                    date.setDate(date.getDate() - (29 - i));
                    return {
                        date: date.toISOString().split('T')[0],
                        total: Math.floor(Math.random() * 5000) + 1000
                    };
                });

                setSalesData(mockData);

                const total = mockData.reduce((acc, curr) => acc + curr.total, 0);
                setStats(prev => ({ ...prev, totalRevenue: total, totalOrders: 142, activeCustomers: 89 }));

                setLoading(false);
            } catch (error) {
                console.error("Error fetching stats:", error);
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    const StatCard = ({ title, value, icon: Icon, trend }) => (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex justify-between items-start">
                <div>
                    <p className="text-sm font-medium text-gray-500">{title}</p>
                    <h3 className="text-2xl font-bold text-charcoal-900 mt-1">{value}</h3>
                </div>
                <div className="p-2 bg-gold-50 rounded-lg">
                    <Icon className="text-gold-600" size={20} />
                </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
                <span className="text-green-500 font-medium flex items-center">
                    <TrendingUp size={14} className="mr-1" />
                    {trend}
                </span>
                <span className="text-gray-400 ml-2">vs last month</span>
            </div>
        </div>
    );

    if (loading) return <div className="p-8">Loading dashboard...</div>;

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-playfair font-bold text-charcoal-900">Dashboard</h1>
                <p className="text-gray-500 mt-1">Welcome back, Admin.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard
                    title="Total Revenue"
                    value={`$${stats.totalRevenue.toLocaleString()}`}
                    icon={DollarSign}
                    trend="+12.5%"
                />
                <StatCard
                    title="Total Orders"
                    value={stats.totalOrders}
                    icon={ShoppingBag}
                    trend="+8.2%"
                />
                <StatCard
                    title="Active Customers"
                    value={stats.activeCustomers}
                    icon={Users}
                    trend="+2.4%"
                />
            </div>

            {/* Sales Chart */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h2 className="text-lg font-semibold text-charcoal-900 mb-6">Sales Overview</h2>
                <div className="h-[400px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={salesData}>
                            <defs>
                                <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#D4AF37" stopOpacity={0.1} />
                                    <stop offset="95%" stopColor="#D4AF37" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                            <XAxis
                                dataKey="date"
                                axisLine={false}
                                tickLine={false}
                                tick={{ fill: '#9CA3AF', fontSize: 12 }}
                                tickFormatter={(str) => {
                                    const date = new Date(str);
                                    return `${date.getMonth() + 1}/${date.getDate()}`;
                                }}
                            />
                            <YAxis
                                axisLine={false}
                                tickLine={false}
                                tick={{ fill: '#9CA3AF', fontSize: 12 }}
                                tickFormatter={(value) => `$${value}`}
                            />
                            <Tooltip
                                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                formatter={(value) => [`$${value}`, 'Revenue']}
                            />
                            <Area
                                type="monotone"
                                dataKey="total"
                                stroke="#D4AF37"
                                strokeWidth={2}
                                fillOpacity={1}
                                fill="url(#colorTotal)"
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
