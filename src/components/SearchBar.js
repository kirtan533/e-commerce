"use client";

import useDebounce from "@/hooks/useDebounce";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const search = searchParams.get("search") || "";
  const [input, setInput] = useState();

  const debounceSearch = useDebounce(input, 500);

  useEffect(() => {
    setInput(search);
  }, [search]);

  useEffect(() => {
    const params = new URLSearchParams(searchParams);

    if (debounceSearch) {
      params.set("search", debounceSearch);
      params.set("page", "1");
    } else {
      params.delete("search");
    }
    router.replace(`/products?${params.toString()}`, { scroll: false });
  }, [debounceSearch]);

  return (
    <input
      type="text"
      placeholder="Search products..."
      className="border rounded-lg px-4 py-2 w-full focus:ring-2 focus:ring-black outline-none"
      value={input || ""}
      onChange={(e) => setInput(e.target.value)}
    />
  );
}
