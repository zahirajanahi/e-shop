import { Shop } from './pages/shop';
import Landing from './pages/landing';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';
import { AdminLogin } from './components/AdminLogin';
import { ProtectedRoute } from './components/ProtectedRoute';
import AdminDashboard from './pages/AdminDashboard';
import CartPage from './pages/cartPage';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <Routes>
            <Route path="/shop" element={<Shop />} />
            <Route path="/" element={<Landing />} />
            <Route path='/cartPage' element={<CartPage />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
          </Routes>
          <Toaster position="top-right" />
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;