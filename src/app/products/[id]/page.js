"use client";

import { fetchProductById } from "@/api/products";
import ProductDetailsSkeleton from "@/components/ProductDetailsSkeleton";
import { useCart } from "@/context/CartContext";
import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter, useSearchParams } from "next/navigation";

export default function ProductDetails() {
  const params = useParams();
  const id = params.id;

  const router = useRouter();
  const searchParams = useSearchParams();

  const from = searchParams.get("from");

  const { addToCart } = useCart();

  const { data, isLoading } = useQuery({
    queryKey: ["product", id],
    queryFn: fetchProductById,
    enabled: !!id,
  });

  if (isLoading) return <ProductDetailsSkeleton />;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <button
        onClick={() => router.push(from || "/products")}
        className="mb-6 text-sm font-medium text-gray-600 hover:text-black cursor-pointer"
      >
        {" "}
        ← Back to Products
      </button>
      <div className="grid md:grid-cols-2 gap-10">
        {/* 🔥 IMAGE */}
        <div className="bg-white border rounded-xl p-6 flex items-center justify-center">
          <img
            src={data.thumbnail}
            alt={data.title}
            className="max-h-96 object-contain"
          />
        </div>

        {/* 🔥 DETAILS */}
        <div className="flex flex-col">
          {/* Title */}
          <h1 className="text-2xl md:text-3xl font-semibold">{data.title}</h1>
          {/* Rating */}
          <div className="flex items-center gap-2 mt-3">
            <span className="bg-green-600 text-white text-sm px-2 py-1 rounded">
              {data.rating} ★
            </span>
            <span className="text-gray-500 text-sm">
              ({data.stock} in stock)
            </span>
          </div>
          {/* Price */}
          <div className="mt-4 flex items-center gap-4">
            <span className="text-3xl font-bold text-gray-900">
              ₹ {data.price}
            </span>

            {data.discountPercentage && (
              <span className="text-green-600 font-medium text-sm">
                {Math.round(data.discountPercentage)}% OFF
              </span>
            )}
          </div>
          {/* Description */}
          <p className="mt-6 text-gray-600 leading-relaxed">
            {data.description}
          </p>
          {/* Buttons */}
          <div className="mt-8 flex gap-4">
            <button
              onClick={() => addToCart(data)}
              className="flex-1 bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition cursor-pointer"
            >
              Add to Cart
            </button>
            <button className="flex-1 border py-3 rounded-lg hover:bg-gray-100 transition cursor-pointer">
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
