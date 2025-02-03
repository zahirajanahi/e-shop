import React from 'react';
import Navbar from '../components/navbar';
import { useCart } from '../contexts/CartContext';
import Cart from '../components/Cart';

const CartPage = () => {
    const { cartItems, removeFromCart, updateQuantity } = useCart();

    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar cartItems={cartItems} />
            <div className="max-w-4xl mx-auto px-4 py-8 pt-28">
                <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
                <Cart
                    items={cartItems}
                    onRemoveFromCart={removeFromCart}
                    onUpdateQuantity={updateQuantity}
                    onCheckout={() => {/* Handle checkout */}}
                />
            </div>
        </div>
    );
};

export default CartPage;