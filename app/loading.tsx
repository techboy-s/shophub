export default function Loading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* 1. Header Skeleton */}
      <div className="h-10 w-48 bg-gray-200 dark:bg-slate-800 rounded-lg animate-pulse mb-8"></div>

      {/* 2. Grid Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-xl overflow-hidden h-full flex flex-col">
            {/* Image Area */}
            <div className="h-60 bg-gray-200 dark:bg-slate-800 animate-pulse"></div>
            
            {/* Content Area */}
            <div className="p-5 space-y-3 flex-grow">
              <div className="h-4 w-1/3 bg-gray-200 dark:bg-slate-800 rounded animate-pulse"></div>
              <div className="h-6 w-3/4 bg-gray-200 dark:bg-slate-800 rounded animate-pulse"></div>
              <div className="h-4 w-full bg-gray-200 dark:bg-slate-800 rounded animate-pulse"></div>
              
              <div className="pt-4 flex items-center justify-between mt-auto">
                 <div className="h-6 w-20 bg-gray-200 dark:bg-slate-800 rounded animate-pulse"></div>
                 <div className="h-10 w-10 bg-gray-200 dark:bg-slate-800 rounded-lg animate-pulse"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}