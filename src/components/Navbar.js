"use client";

import { useCart } from "@/context/CartContext";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { PiShoppingCartSimpleThin } from "react-icons/pi";

export default function Navbar() {
  const { cart } = useCart();
  const [open, setOpen] = useState();
  const pathname = usePathname();

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <nav className="bg-white border-b shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="text-gray-700 text-xl font-semibold flex items-center"
        >
          Estore
          <span className="ml-3">
            <PiShoppingCartSimpleThin size={26} />
          </span>
        </Link>
        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          <Link
            href="/"
            className={`${pathname === "/" ? "text-indigo-400" : "text-black"}`}
          >
            Home
          </Link>
          <Link
            href="/products"
            className={`${pathname === "/products" ? "text-indigo-400" : "text-black"}`}
          >
            Products
          </Link>
          <Link
            href="/cart"
            className={`${pathname === "/cart" ? "text-indigo-400" : "text-black"} relative`}
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
