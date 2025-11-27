const RecipeCardSkeleton = () => {
  return (
    <div
      className="
        grid 
        grid-cols-2
        md:grid-cols-3
        lg:grid-cols-4
        gap-4 md:gap-6
      "
    >
      {Array.from({ length: 12 }).map((_, index) => (
        <div
          key={index}
          className="bg-white rounded-xl overflow-hidden shadow-sm animate-pulse"
        >
          <div className="h-40 md:h-48 bg-gray-200 relative">
            <div className="absolute top-3 right-3 w-8 h-8 bg-gray-200 rounded-full shadow-md" />
            <div className="absolute bottom-3 left-3 w-20 h-5 bg-gray-300 rounded-full" />
          </div>

          {/* Content Skeleton */}
          <div className="p-4">
            <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>

            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-gray-300 rounded" />
                <div className="w-10 h-3 bg-gray-300 rounded" />
              </div>

              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="w-4 h-4 bg-gray-300 rounded" />
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecipeCardSkeleton;
