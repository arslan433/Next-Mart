"use client";
import { useEffect, useState } from "react";
import { useCartStore } from "@/src/store/cartStore";

export default function Cart() {
  const { cart, increaseQty, decreaseQty, removeFromCart, clearCart } = useCartStore();
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated) return null;

  // Calculate totals
  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalAmount = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="p-6 bg-gray-50 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">Shopping Cart</h2>

      {cart.length === 0 ? (
        <p>Your cart is empty 🛒</p>
      ) : (
        <>
          <ul className="space-y-4">
            {cart.map((item) => (
              <li
                key={item.id}
                className="flex items-center justify-between border-b pb-2"
              >
                <div>
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="text-sm text-gray-500">
                    ${Number(item.price).toFixed(2)} × {item.quantity} ={" "}
                    <strong>${Number(item.price * item.quantity).toFixed(2)}</strong>
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => decreaseQty(item.id)}
                    className="px-2 py-1 bg-gray-200 rounded"
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => increaseQty(item.id)}
                    className="px-2 py-1 bg-gray-200 rounded"
                  >
                    +
                  </button>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="ml-4 text-red-500"
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>

          {/* Cart Summary */}
          <div className="mt-6 border-t pt-4 text-right">
            <p className="text-lg font-semibold">
              Total Products: {totalQuantity}
            </p>
            <p className="text-xl font-bold text-green-600">
              Total Amount: ${totalAmount.toFixed(2)}
            </p>
          </div>

          <button
            onClick={clearCart}
            className="mt-6 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Empty Cart
          </button>
        </>
      )}
    </div>
  );
}
