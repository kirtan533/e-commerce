"use client";

import { fetchProductById } from "@/api/products";
import Skeleton from "@/components/Skeleton";
import { useCart } from "@/context/CartContext";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

export default function ProductDetails() {
  const params = useParams();
  const id = params.id;

  const { addToCart } = useCart();

  const { data, isLoading } = useQuery({
    queryKey: ["product", id],
    queryFn: fetchProductById,
    enabled: !!id,
  });

  if (isLoading) return <Skeleton />;

  return (
    <div className="p-4">
      <img src={data.thumbnail} className="w-64" />
      <h1 className="text-2xl">{data.title}</h1>
      <p className="text-lg">{data.price}</p>
      <p>{data.description}</p>
      <button onClick={() => data && addToCart(data)}>Add to Cart</button>
    </div>
  );
}
