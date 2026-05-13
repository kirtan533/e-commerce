"use client";

import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { FaHeart } from "react-icons/fa";

export default function ProductCard({ product, onPrefetch }) {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const isWish = isInWishlist(product.id);

  const searchParams = useSearchParams();
  const pathname = usePathname();

  const currentUrl = `${pathname}?${searchParams.toString()}`;

  const handleAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  const handleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  return (
    <div className="relative group bg-white rounded-xl border hover:shadow-lg transition p-4 flex flex-col h-full">
      {/*  Wishlist Button */}
      <button
        onClick={handleWishlist}
        className="absolute top-3 right-3 z-20 bg-white/80 backdrop-blur p-2 rounded-full shadow hover:scale-110 transition"
      >
        <FaHeart
          className={`text-lg ${isWish ? "text-red-500" : "text-gray-300"}`}
        />
      </button>
      {/*  Clickable Area */}
      <Link
        href={`/products/${product.id}?from=${encodeURIComponent(currentUrl)}`}
        onMouseEnter={() => onPrefetch?.(product.id)}
        className="block"
      >
        <div className="h-44 flex items-center justify-center overflow-hidden">
          <img
            src={product.thumbnail}
            alt={product.title}
            className="h-full object-contain transition duration-300 group-hover:scale-105"
          />
        </div>

        <h2 className="text-sm font-semibold mt-3 line-clamp-2">
          {product.title}
        </h2>

        <p className="text-lg font-bold mt-1 text-gray-900">
          ₹ {product.price}
        </p>
      </Link>

      <div className="flex-grow" />

      {/* Add to Cart */}
      <button
        onClick={handleAdd}
        className="mt-3 bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition"
      >
        Add to Cart
      </button>
    </div>
  );
}
