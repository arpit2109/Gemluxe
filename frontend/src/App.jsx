import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ProductListing from './pages/ProductListing';
import ProductDetail from './pages/ProductDetail';
import UserProfile from './pages/UserProfile';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import OrderSuccess from './pages/OrderSuccess';
import NotFound from './pages/NotFound';
import AuthModal from './components/AuthModal';

import AdminLayout from './layouts/AdminLayout';
import Dashboard from './pages/admin/Dashboard';
import InventoryTable from './pages/admin/InventoryTable';
import ProductForm from './pages/admin/ProductForm';

import { CartProvider } from './context/CartContext';

// Public Layout Wrapper
const PublicLayout = () => {
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  return (
    <CartProvider>
      <div className="min-h-screen bg-white">
        <Navbar onAuthClick={() => setIsAuthOpen(true)} />
        <Outlet />
        <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
      </div>
    </CartProvider>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/collections" element={<ProductListing />} />
          <Route path="/category/:category" element={<ProductListing />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order-success" element={<OrderSuccess />} />
        </Route>

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="inventory" element={<InventoryTable />} />
          <Route path="orders" element={<div className="p-8">Orders Management (Coming Soon)</div>} />
          <Route path="products/new" element={<ProductForm />} />
          <Route path="products/:id" element={<ProductForm />} />
        </Route>

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
