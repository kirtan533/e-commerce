"use client";

import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { auth } from "@/firebase/config";
import { signOut } from "firebase/auth";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { PiShoppingCartSimpleThin } from "react-icons/pi";

export default function Navbar() {
  const { cart } = useCart();
  const { user } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const logout = async () => {
    await signOut(auth);
    router.replace("/login");
  };

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
          {/* AUTH BUTTON */}
          <div>
            {user ? (
              <button
                onClick={logout}
                className="px-4 py-1.5 sm:py-2 text-md sm:text-base bg-red-500 hover:bg-red-600 text-white rounded-lg transition"
              >
                Logout
              </button>
            ) : (
              <Link href="/login">
                <button className="px-4 py-1.5 sm:px-5 sm:py-2 text-md sm:text-base bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition">
                  Login
                </button>
              </Link>
            )}
          </div>
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
          <Link href="/" onClick={() => setOpen(false)}>
            Home
          </Link>

          <Link href="/products" onClick={() => setOpen(false)}>
            Products
          </Link>

          <Link
            href="/cart"
            onClick={() => setOpen(false)}
            className="flex justify-between"
          >
            Cart
            {totalItems > 0 && (
              <span className="bg-black text-white text-xs px-2 py-[2px] rounded-full">
                {totalItems}
              </span>
            )}
          </Link>

          {/* MOBILE AUTH */}
          {user ? (
            <button
              onClick={() => {
                logout();
                setOpen(false);
              }}
              className="bg-red-500 text-white py-2 rounded-lg"
            >
              Logout
            </button>
          ) : (
            <Link href="/login" onClick={() => setOpen(false)}>
              <button className="bg-blue-500 text-white py-2 rounded-lg w-full">
                Login
              </button>
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}
