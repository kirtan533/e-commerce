"use client";

import { useCart } from "@/context/CartContext";
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const { cart } = useCart();
  const [open, setOpen] = useState();

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <nav className="bg-white border-b shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold text-gray-800">
          MyStore
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          <Link href="/products" className="text-gray-700 hover:text-black">
            Products
          </Link>

          <Link
            href="/cart"
            className="relative text-gray-700 hover:text-black"
          >
            Cart
            {totalItems > 0 && (
              <span className="absolute -top-3 -right-4 bg-black text-white text-xs px-2 py-[2px] rounded-full">
                {totalItems}
              </span>
            )}
          </Link>
        </div>

        {/* Mobile Button */}
        <button
          className="md:hidden text-gray-800 text-2xl"
          onClick={() => setOpen(!open)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden px-4 pb-4 flex flex-col gap-3 border-t">
          <Link
            href="/products"
            onClick={() => setOpen(false)}
            className="text-gray-700"
          >
            Products
          </Link>

          <Link
            href="/cart"
            onClick={() => setOpen(false)}
            className="flex items-center justify-between text-gray-700"
          >
            Cart
            {totalItems > 0 && (
              <span className="bg-black text-white text-xs px-2 py-[2px] rounded-full">
                {totalItems}
              </span>
            )}
          </Link>
        </div>
      )}
    </nav>
  );
}
