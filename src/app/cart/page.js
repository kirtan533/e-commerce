"use client";

import { useCart } from "@/context/CartContext";

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity } = useCart();

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  if (cart.length === 0) {
    return <h1 className="p-4">Cart is empty</h1>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">Your Cart</h1>

      {cart.map((item) => (
        <div key={item.id} className="border p-4 mb-2">
          <h2>{item.title}</h2>
          <p>₹ {item.price}</p>
          <h2 className="text-xl mt-4">Total: ₹ {total}</h2>
          <input
            type="number"
            value={item.quantity}
            min="1"
            onChange={(e) => updateQuantity(item.id, Number(e.target.value))}
            className="border p-1"
          />
          <button
            onClick={() => removeFromCart(item.id)}
            className="ml-4 text-red-500"
          >
            Remove
          </button>
        </div>
      ))}
    </div>
  );
}
