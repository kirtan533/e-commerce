"use client";

import { fetchProducts } from "@/api/products";
import ProductCard from "@/components/ProductCard";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import ProtectedRoutes from "@/components/ProtectedRoute";

export default function Home() {
  const { addToCart } = useCart();

  const { data, isLoading } = useQuery({
    queryKey: ["featured-products"],
    queryFn: () =>
      fetchProducts({ queryKey: ["products", { page: 1, limit: 6 }] }),
  });

  return (
    <ProtectedRoutes>
      <div className="max-w-7xl mx-auto px-4 py-8 space-y-14">
        {/*  HERO */}
        <section className="bg-gradient-to-r from-gray-900 to-black text-white rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="max-w-xl">
            <h1 className="text-3xl md:text-5xl font-bold leading-tight">
              Discover Amazing Products
            </h1>

            <p className="text-gray-300 mt-4 text-sm md:text-base">
              Explore top quality products with best deals and fast delivery.
            </p>

            <Link
              href="/products"
              className="inline-block mt-6 bg-white text-black px-6 py-3 rounded-lg font-medium hover:bg-gray-200 transition"
            >
              Shop Now
            </Link>
          </div>

          {/* Better visual */}
          <div className="hidden md:block w-96 h-64">
            <img
              src="https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?q=80&w=1200&auto=format&fit=crop"
              className="w-full h-full object-cover rounded-xl"
            />
          </div>
        </section>

        {/*  CATEGORIES */}
        <section>
          <h2 className="text-xl md:text-2xl font-semibold mb-6">
            Shop by Category
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
            {[
              { name: "Beauty", value: "beauty" },
              { name: "Furniture", value: "furniture" },
              { name: "Groceries", value: "groceries" },
              { name: "Mens Shoes", value: "mens-shoes" },
            ].map((cat) => (
              <Link
                key={cat.value}
                href={`/products?category=${cat.value}`}
                className="bg-gray-100 hover:bg-gray-200 p-6 rounded-xl text-center transition font-medium shadow-sm hover:shadow-md"
              >
                {cat.name}
              </Link>
            ))}
          </div>
        </section>

        {/* FEATURED PRODUCTS */}
        <section>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl md:text-2xl font-semibold">
              Featured Products
            </h2>

            <Link
              href="/products"
              className="text-sm text-gray-500 hover:text-black"
            >
              View All
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {isLoading
              ? Array(6)
                  .fill(0)
                  .map((_, i) => (
                    <div
                      key={i}
                      className="h-72 bg-gray-200 animate-pulse rounded-xl"
                    />
                  ))
              : data?.products?.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={addToCart}
                  />
                ))}
          </div>
        </section>
      </div>
    </ProtectedRoutes>
  );
}
