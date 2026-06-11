// components/Footer.jsx

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-black text-gray-300">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
          {/* Brand Section */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">Estore</h2>

            <p className="text-sm leading-6">
              Your one-stop destination for trendy fashion, electronics, and
              everyday essentials at the best prices.
            </p>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Company</h3>

            <ul className="space-y-3">
              <li>
                <span className="hover:text-white transition cursor-not-allowed">
                  About Us
                </span>
              </li>

              <li>
                <span className="hover:text-white transition cursor-not-allowed">
                  Contact Us
                </span>
              </li>

              <li>
                <span className="hover:text-white transition cursor-not-allowed">
                  Terms & Conditions
                </span>
              </li>
            </ul>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Products</h3>

            <ul className="space-y-3">
              <li>
                <span className="hover:text-white transition cursor-not-allowed">
                  Beauty
                </span>
              </li>

              <li>
                <span className="hover:text-white transition cursor-not-allowed">
                  Furniture
                </span>
              </li>

              <li>
                <span className="hover:text-white transition cursor-not-allowed">
                  Groceries
                </span>
              </li>

              <li>
                <span className="hover:text-white transition cursor-not-allowed">
                  Mens Shoes
                </span>
              </li>
            </ul>
          </div>

          {/* Newsletter / Contact */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">
              Stay Connected
            </h3>

            <p className="text-sm mb-4">
              Subscribe to get special offers and latest updates.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Enter email"
                className="px-4 py-2 rounded-md bg-gray-800 text-white outline-none w-full"
              />

              <button className="bg-white text-black px-5 py-2 rounded-md font-medium hover:bg-gray-200 transition">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-800 mt-10 pt-6 text-center text-sm">
          <p>© {new Date().getFullYear()} Estore. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
