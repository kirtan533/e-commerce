"use client";

import { useCart } from "@/context/CartContext";

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity } = useCart();

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto py-20 text-center">
        <h1 className="text-2xl font-semibold mb-2">Your cart is empty</h1>
        <p className="text-gray-500">Add some products to get started</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-semibold mb-6">Shopping Cart</h1>

      <div className="grid md:grid-cols-3 gap-8">
        {/*  LEFT: ITEMS */}
        <div className="md:col-span-2 space-y-4">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex gap-4 border rounded-xl p-4 bg-white"
            >
              {/* IMAGE */}
              <img
                src={item.thumbnail}
                className="w-24 h-24 object-cover rounded-lg"
              />

              {/* DETAILS */}
              <div className="flex-1">
                <h2 className="font-medium line-clamp-2">{item.title}</h2>

                <p className="text-gray-500 text-sm mt-1">
                  ₹ {item.price.toFixed(2)}
                </p>

                {/*  QUANTITY */}
                <div className="flex items-center gap-3 mt-3">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    disabled={item.quantity <= 1}
                    className="px-3 py-1 border rounded disabled:opacity-50"
                  >
                    -
                  </button>

                  <span className="font-medium">{item.quantity}</span>

                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="px-3 py-1 border rounded"
                  >
                    +
                  </button>
                </div>

                {/* REMOVE */}
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500 text-sm mt-3"
                >
                  Remove
                </button>
              </div>

              {/* ITEM TOTAL */}
              <div className="font-semibold">
                ₹ {(item.price * item.quantity).toFixed(2)}
              </div>
            </div>
          ))}
        </div>

        {/*  RIGHT: SUMMARY */}
        <div className="border rounded-xl p-6 h-fit bg-white space-y-4">
          <h2 className="text-lg font-semibold">Order Summary</h2>

          <div className="flex justify-between text-sm">
            <span>Subtotal</span>
            <span>₹ {total.toFixed(2)}</span>
          </div>

          <div className="flex justify-between text-sm">
            <span>Shipping</span>
            <span className="text-green-600">Free</span>
          </div>

          <div className="border-t pt-4 flex justify-between font-semibold">
            <span>Total</span>
            <span>₹ {total.toFixed(2)}</span>
          </div>

          <button className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition">
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
}
