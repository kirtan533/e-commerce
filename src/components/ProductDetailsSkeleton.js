export default function ProductDetailsSkeleton() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 grid md:grid-cols-2 gap-10">
      {/* IMAGE */}
      <div className="h-96 rounded-xl shimmer" />

      {/* CONTENT */}
      <div className="space-y-4">
        <div className="h-6 w-3/4 rounded shimmer" />
        <div className="h-4 w-1/2 rounded shimmer" />
        <div className="h-8 w-1/3 rounded shimmer" />
        <div className="h-20 rounded shimmer" />
        <div className="h-12 rounded shimmer" />
      </div>
    </div>
  );
}
