"use client";
import { useCartStore } from "@/src/store/cartStore";
import { CircleX } from "lucide-react";
import Link from "next/link";

export default function CartPage() {
  const { cart, increaseQty, decreaseQty, removeFromCart, clearCart } =
    useCartStore();

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <section className="w-full py-9 px-4 sm:px-6 lg:px-8">
      <h1 className="text-[28px] sm:text-[32px] font-semibold">
        My Shopping Cart
      </h1>

      {cart.length === 0 ? (
        <div className="flex items-center justify-center h-64">
          <p className="text-gray-500 text-lg sm:text-xl font-medium">
            🛒 Your cart is empty
          </p>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-6 mt-8">
          {/* Cart Table */}
          <div className="bg-white p-4 rounded-xl w-full lg:w-2/3 overflow-x-auto shadow-sm">
            <table className="w-full min-w-[600px] text-sm sm:text-base">
              <thead>
                <tr className="text-center border-b border-gray-300 text-[#7f7f7f] text-xs sm:text-sm font-medium uppercase">
                  <th className="text-left px-2 py-2">Product</th>
                  <th className="px-2 py-2">Price</th>
                  <th className="px-2 py-2">Quantity</th>
                  <th className="px-2 py-2">Subtotal</th>
                  <th className="px-2 py-2"></th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item) => (
                  <tr
                    key={item.id}
                    className="text-center border-b last:border-none"
                  >
                    <td className="px-2 py-3 text-left flex items-center gap-3">
                      <img
                        src={item.thumbnail || item.image}
                        alt={item.title}
                        className="w-[60px] h-[60px] sm:w-[80px] sm:h-[80px] rounded object-cover"
                      />
                      <span className="text-sm sm:text-base">{item.title}</span>
                    </td>
                    <td className="px-2 py-2">
                      ${Number(item.price).toFixed(2)}
                    </td>
                    <td className="px-2 py-2">
                      <div className="flex items-center justify-center gap-2 border rounded-full px-3 py-1 w-fit mx-auto">
                        {item.quantity === 1 ? (
                          <button className="text-gray-300">-</button>
                        ) : (
                          <button onClick={() => decreaseQty(item.id)}>-</button>
                        )}
                        <span>{item.quantity}</span>
                        <button onClick={() => increaseQty(item.id)}>+</button>
                      </div>
                    </td>
                    <td className="px-2 py-2">
                      ${Number(item.price * item.quantity).toFixed(2)}
                    </td>
                    <td className="px-2 py-2">
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <CircleX />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Cart Summary */}
          <div className="bg-white rounded-lg p-6 shadow-md w-full lg:w-1/3 h-fit sticky top-4">
            <h2 className="text-[#191919] mb-4 text-lg sm:text-xl font-medium">
              Cart Total
            </h2>
            <div className="flex flex-col gap-3">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span className="font-medium">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Total Items:</span>
                <span className="font-medium">{totalItems}</span>
              </div>
            </div>
            <div className="mt-6 flex flex-col gap-3">
              <Link href="/checkout">
                <button className="w-full bg-slate-900 text-white px-4 py-2 rounded-md hover:bg-gray-700">
                  Proceed to Checkout
                </button>
              </Link>
              <button
                onClick={clearCart}
                className="w-full border border-red-500 text-red-500 px-4 py-2 rounded-md hover:bg-red-500 hover:text-white transition"
              >
                Clear Cart
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
