export default function ProductSkeleton() {
  return (
    <div className="bg-white border rounded-xl p-4 animate-pulse">
      <div className="h-44 bg-gray-200 rounded mb-3"></div>
      <div className="h-4 bg-gray-200 w-3/4 mb-2"></div>
      <div className="h-4 bg-gray-200 w-1/2 mb-3"></div>
      <div className="h-10 bg-gray-200 rounded"></div>
    </div>
  );
}
