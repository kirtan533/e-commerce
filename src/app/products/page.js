"use client";

import FiltersSidebar from "@/components/FiltersSidebar";
import ProductGrid from "@/components/ProductGrid";
import SearchBar from "@/components/SearchBar";
import { auth } from "@/firebase/config";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Products() {
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push("/login");
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Mobile button always visible */}
      <FiltersSidebar />

      <div className="flex gap-6">
        {/* Desktop Sidebar */}
        <div className="hidden md:block w-64 shrink-0">
          <FiltersSidebar isDesktop />
        </div>
        {/* Main Content */}
        <div className="flex-1 min-w-0">
          <SearchBar />
          <ProductGrid />
        </div>
      </div>
    </div>
  );
}
