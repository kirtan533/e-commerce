"use client";

import { fetchProductById, fetchProducts } from "@/api/products";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import ProductSkeleton from "./ProductSkeleton";
import ProductCard from "./ProductCard";

export default function ProductGrid() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const queryClient = useQueryClient();

  // safe params
  const category = searchParams.get("category") ?? "";
  const min = searchParams.get("min") ?? "";
  const max = searchParams.get("max") ?? "";
  const page = Number(searchParams.get("page")) || 1;
  const search = searchParams.get("search") ?? "";

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["products", { page, limit: 9, search, category, min, max }],
    queryFn: fetchProducts,
    keepPreviousData: true,
  });

  //  URL update
  const updateParams = (newParams) => {
    const params = new URLSearchParams(searchParams);

    Object.entries(newParams).forEach(([key, value]) => {
      if (value) params.set(key, value);
      else params.delete(key);
    });

    router.replace(`/products?${params.toString()}`, { scroll: false });
  };

  //  Prefetch
  const handlePrefetch = (id) => {
    queryClient.prefetchQuery({
      queryKey: ["product", id],
      queryFn: fetchProductById,
      staleTime: 1000 * 60 * 5, // 5 min
    });
  };

  return (
    <>
      {/* GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {isLoading ? (
          Array(9)
            .fill(0)
            .map((_, i) => <ProductSkeleton key={i} />)
        ) : data?.products?.length > 0 ? (
          data.products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onPrefetch={handlePrefetch}
            />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">
            No products found
          </p>
        )}
      </div>

      {/* PAGINATION */}
      <div className="flex justify-center items-center gap-4 mt-10">
        <button
          disabled={page === 1 || isFetching}
          className="px-4 py-2 border rounded disabled:opacity-50"
          onClick={() => updateParams({ page: page - 1 })}
        >
          Prev
        </button>

        <span className="text-sm text-gray-600">Page {page}</span>

        <button
          disabled={isFetching}
          className="px-4 py-2 border rounded disabled:opacity-50"
          onClick={() => updateParams({ page: page + 1 })}
        >
          Next
        </button>
      </div>
    </>
  );
}
