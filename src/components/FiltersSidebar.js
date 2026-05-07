"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import useDebounce from "@/hooks/useDebounce";

export default function FiltersSidebar({ isDesktop = false }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const category = searchParams.get("category") ?? "";
  const min = searchParams.get("min") ?? "";
  const max = searchParams.get("max") ?? "";

  const [price, setPrice] = useState({ min, max });
  const [open, setOpen] = useState(false);

  const debouncedPrice = useDebounce(price, 500);

  const updateParams = (newParams) => {
    const params = new URLSearchParams(searchParams);

    Object.entries(newParams).forEach(([key, value]) => {
      if (value) params.set(key, value);
      else params.delete(key);
    });

    router.replace(`/products?${params.toString()}`, { scroll: false });
  };

  useEffect(() => {
    if (price.min && price.max && Number(price.min) > Number(price.max)) return;

    updateParams({
      min: debouncedPrice.min,
      max: debouncedPrice.max,
      page: 1,
    });
  }, [debouncedPrice]);

  const clearFilters = () => {
    router.replace("/products");
    setPrice({ min: "", max: "" });
  };

  // ================= MOBILE =================
  if (!isDesktop) {
    return (
      <>
        <button
          onClick={() => setOpen(true)}
          className="md:hidden w-full mb-4 px-4 py-2 border rounded-lg bg-white shadow-sm"
        >
          Filters
        </button>

        {open && (
          <div className="fixed inset-0 z-50">
            <div
              className="absolute inset-0 bg-black/40"
              onClick={() => setOpen(false)}
            />

            <div className="absolute left-0 top-0 h-full w-72 bg-white p-5 overflow-y-auto shadow-xl">
              <button
                onClick={() => setOpen(false)}
                className="mb-4 text-sm text-gray-500"
              >
                ✕ Close
              </button>

              <FilterContent
                category={category}
                price={price}
                setPrice={setPrice}
                updateParams={updateParams}
                clearFilters={clearFilters}
              />
            </div>
          </div>
        )}
      </>
    );
  }

  // ================= DESKTOP =================
  return (
    <div className="w-64 bg-white border rounded-xl p-5 shadow-sm h-fit sticky top-20">
      <FilterContent
        category={category}
        price={price}
        setPrice={setPrice}
        updateParams={updateParams}
        clearFilters={clearFilters}
      />
    </div>
  );
}

// ================= CONTENT =================

function FilterContent({
  category,
  price,
  setPrice,
  updateParams,
  clearFilters,
}) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Filters</h2>
        <button onClick={clearFilters} className="text-sm text-red-500">
          Clear
        </button>
      </div>

      {/* Category */}
      <div>
        <label className="text-sm font-medium text-gray-700">Category</label>
        <select
          value={category}
          onChange={(e) => updateParams({ category: e.target.value, page: 1 })}
          className="mt-1 w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-black outline-none"
        >
          <option value="">All Categories</option>
          <option value="beauty">Beauty</option>
          <option value="fragrances">Fragrances</option>
          <option value="furniture">Furniture</option>
          <option value="groceries">Groceries</option>
          <option value="home-decoration">Home Decoration</option>
          <option value="kitchen-accessories">Kitchen</option>
          <option value="mens-shirts">Men Shirts</option>
          <option value="mens-shoes">Men Shoes</option>
          <option value="mens-watches">Men Watches</option>
          <option value="mobile-accessories">Mobile Accessories</option>
          <option value="skin-care">Skin Care</option>
        </select>
      </div>

      {/* Price */}
      <div>
        <label className="text-sm font-medium text-gray-700">Price Range</label>

        <div className="flex gap-3 mt-3">
          <div className="flex flex-col w-full">
            <span className="text-xs text-gray-500 mb-1">Min Price</span>
            <input
              type="number"
              min="0"
              value={price.min}
              onChange={(e) => {
                const v = e.target.value;
                if (v === "" || Number(v) >= 0) {
                  setPrice((p) => ({ ...p, min: v }));
                }
              }}
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-black outline-none"
            />
          </div>

          <div className="flex flex-col w-full">
            <span className="text-xs text-gray-500 mb-1">Max Price</span>
            <input
              type="number"
              min="0"
              value={price.max}
              onChange={(e) => {
                const v = e.target.value;
                if (v === "" || Number(v) >= 0) {
                  setPrice((p) => ({ ...p, max: v }));
                }
              }}
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-black outline-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
