"use client";
import { useCartStore } from "@/src/store/cartStore";
import { CircleX } from 'lucide-react';

export default function CartPage() {
  const { cart, increaseQty, decreaseQty, removeFromCart, clearCart } =
    useCartStore();

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
console.log(cart)
  return (
    <section className="grid w-full py-9 px-8 ">
      <h1 className="text text-[32px] font-semibold">
        My Shopping Cart
      </h1>

      {cart.length === 0 ? (
        <div className="items-center justify-center h-64">
          <p className="text-gray-500 text-xl font-medium">🛒 Your cart is empty</p>
        </div>
      ) : (
        <div className="flex items-start mt-8 gap-6 max-md:grid">
          <div className="bg-white p-4 w-[800px] rounded-xl">
            <table className="w-full bg-white rounded-xl max-md:w-auto">
              <thead>
                <tr className="text-center border-b border-gray-400 text-[#7f7f7f] text-sm font-medium uppercase">
                  <th className="text-left px-2 py-2">Product</th>
                  <th className="px-2 py-2">Price</th>
                  <th className="px-2 py-2">Quantity</th>
                  <th className="px-2 py-2">Subtotal</th>
                  <th className="px-2 py-2"></th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item) => (
                  <tr key={item.id} className="text-center border-b">
                    <td className="px-2 py-2 text-left flex items-center gap-2">
                      <img
                        src={item.thumbnail || item.image}
                        alt={item.title}
                        className="w-[80px] h-[80px] rounded"
                      />
                      <span>{item.title}</span>
                    </td>
                    <td className="px-2 py-2">${Number(item.price).toFixed(2)}</td>
                    <td className="px-2 py-2">
                      <div className="flex items-center justify-around gap-2 border rounded-full px-3 py-1">
                        {item.quantity == 1 ? <button className="text-gray-300">-</button> : <button onClick={() => decreaseQty(item.id)}>-</button>
                        }
                        <span>{item.quantity}</span>
                        <button onClick={() => increaseQty(item.id)}>+</button>
                      </div>
                    </td>
                    <td className="px-2 py-2">
                      ${Number(item.price * item.quantity).toFixed(2)}
                    </td>
                    <td className="px-2 py-2 pb-[2px]">
                      <button onClick={() => removeFromCart(item.id)}><CircleX /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Cart Summary */}
          <div className="w-[424px] bg-white rounded-lg p-6 max-md:w-auto">
            <h2 className="text-[#191919] mb-2 text-xl font-medium">Cart Total</h2>
            <div className="flex-col py-3">
              <div className="flex justify-between py-2">

                <span>Subtotal:</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between py-2">
                <span>Total Items:</span>
                <span>{totalItems}</span>
              </div>
            </div>
            <button className="w-full mt-5 px-10 py-4 bg-[#00b206] text-white rounded-[44px] font-semibold">
              Proceed to checkout
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
