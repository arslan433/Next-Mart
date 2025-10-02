"use client";
import { useCartStore } from "@/src/store/cartStore";
import { useState } from "react";

export default function CheckoutPage() {
    const cart = useCartStore((state) => state.cart);
    const clearCart = useCartStore((state) => state.clearCart);

    const [form, setForm] = useState({
        name: "",
        email: "",
        address: "",
        payment: "cod", 
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Order placed:", { ...form, cart, total });
        alert("Order placed successfully!");
        clearCart();
    };

    return (
        <div className="mx-auto p-6 max-w-lg">
            <h1 className="text-2xl font-bold mb-6">Checkout</h1>

            {/* Cart Summary */}
            <div className="bg-white shadow rounded-lg p-4 mb-6">
                <h2 className="text-lg font-semibold mb-4">Your Cart</h2>
                {cart.length === 0 ? (
                    <p className="text-gray-500">Your cart is empty.</p>
                ) : (
                    <div className="space-y-4">
                        {cart.map((item) => (
                            <div
                                key={item.id}
                                className="flex items-center justify-between border-b pb-2"
                            >
                                <div className="flex items-center gap-3">
                                    <img
                                        src={item.image || item.thumbnail}
                                        alt={item.name}
                                        className="w-16 h-16 object-cover rounded"
                                    />
                                    <div>
                                        <p className="font-medium">{item.name}</p>
                                        <p className="text-sm text-gray-500">
                                            {item.quantity} × ${item.price}
                                        </p>
                                    </div>
                                </div>
                                <p className="font-semibold">${item.price * item.quantity}</p>
                            </div>
                        ))}
                        <div className="flex justify-between font-bold text-lg pt-2">
                            <span>Total:</span>
                            <span>${Number(total).toFixed(2)}</span>
                        </div>
                    </div>
                )}
            </div>

            {/* Checkout Form */}
            <form
                onSubmit={handleSubmit}
                className="bg-white shadow rounded-lg p-6 space-y-4 max-w-lg justify-self-center"
            >
                <h2 className="text-lg font-semibold mb-4">Billing Details</h2>

                <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    className="w-full border rounded px-3 py-2"
                />

                <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={form.email}
                    onChange={handleChange}
                    required
                    className="w-full border rounded px-3 py-2"
                />

                <textarea
                    name="address"
                    placeholder="Shipping Address"
                    value={form.address}
                    onChange={handleChange}
                    required
                    className="w-full border rounded px-3 py-2"
                />

                <div>
                    <label className="block mb-2 font-medium">Payment Method</label>
                    <select
                        name="payment"
                        value={form.payment}
                        onChange={handleChange}
                        className="w-full border rounded px-3 py-2"
                    >
                        <option value="cod">Cash on Delivery</option>
                        <option value="card">Credit/Debit Card</option>
                        <option value="paypal">PayPal</option>
                    </select>
                </div>

                <button
                    type="submit"
                    disabled={cart.length === 0}
                    className="w-full bg-slate-900 text-white py-2.5 rounded-md hover:bg-gray-700 disabled:opacity-50"
                >
                    Place Order
                </button>
            </form>
        </div>
    );
}
