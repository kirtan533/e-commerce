"use client";

import ProductCard from "@/components/ProductCard";
import ProtectedRoutes from "@/components/ProtectedRoute";
import { useWishlist } from "@/context/WishlistContext";

export default function WishlistPage() {
  const { wishlist } = useWishlist();

  return (
    <ProtectedRoutes>
      <div className="max-w-7xl mx-auto px-4 py-6">
        <h1 className="text-2xl font-semibold mb-6">Your Wishlist</h1>

        {wishlist.length === 0 ? (
          <p className="text-center text-gray-500">No items in wishlist</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {wishlist.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </ProtectedRoutes>
  );
}
