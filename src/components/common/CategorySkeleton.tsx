const CategorySkeleton = () => {
  return (
    <div
      className="
        grid
        grid-cols-3        /* mobile: 3 */
        md:grid-cols-4     /* tablet: 4 */
        lg:grid-cols-9     /* desktop: 9 */
        gap-3 md:gap-4
        animate-pulse
      "
    >
      {Array.from({ length: 18 }).map((_, i) => (
        <div key={i} className="h-10 bg-gray-200 rounded-lg"></div>
      ))}
    </div>
  );
};

export default CategorySkeleton;
