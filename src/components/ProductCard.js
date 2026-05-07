"use client";

import { useCart } from "@/context/CartContext";
import Link from "next/link";

export default function ProductCard({ product, onPrefetch }) {
  const { addToCart } = useCart();

  return (
    <Link
      href={`/products/${product.id}`}
      onMouseEnter={() => onPrefetch(product.id)}
    >
      <div className="bg-white rounded-xl border hover:shadow-lg transition p-4 flex flex-col h-full">
        <div className="h-44 flex items-center justify-center overflow-hidden">
          <img
            src={product.thumbnail}
            alt={product.title}
            className="h-full object-contain group-hover:scale-105 transition"
          />
        </div>
        <h2 className="text-sm font-semibold mt-3 line-clamp-2">
          {product.title}
        </h2>
        <p className="text-lg font-bold mt-1 text-gray-900">
          {" "}
          ₹ {product.price}
        </p>
        <div className="flex-grow"></div>
        <button
          className="mt-3 bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition"
          onClick={(e) => {
            e.preventDefault();
            addToCart(product);
          }}
        >
          Add to Cart
        </button>
      </div>
    </Link>
  );
}
