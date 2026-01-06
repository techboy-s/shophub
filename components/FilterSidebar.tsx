import React from 'react';

const FilterSidebar = () => {
  return (
    <div className="w-full">
      <h3 className="text-lg font-bold text-slate-900 mb-4">Filters</h3>
      
      {/* Category Filter */}
      <div className="mb-6 border-b border-gray-200 pb-6">
        <h4 className="font-medium text-sm text-slate-800 mb-3">Category</h4>
        <div className="space-y-2">
          {['Electronics', 'Fashion', 'Home & Kitchen', 'Books'].map((cat) => (
            <label key={cat} className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
              <span className="text-sm text-slate-600 hover:text-indigo-600">{cat}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range Filter */}
      <div className="mb-6 border-b border-gray-200 pb-6">
        <h4 className="font-medium text-sm text-slate-800 mb-3">Price</h4>
        <div className="space-y-2">
           <label className="flex items-center gap-2 cursor-pointer">
              <input type="radio" name="price" className="text-indigo-600 focus:ring-indigo-500" />
              <span className="text-sm text-slate-600">Under $50</span>
           </label>
           <label className="flex items-center gap-2 cursor-pointer">
              <input type="radio" name="price" className="text-indigo-600 focus:ring-indigo-500" />
              <span className="text-sm text-slate-600">$50 to $100</span>
           </label>
           <label className="flex items-center gap-2 cursor-pointer">
              <input type="radio" name="price" className="text-indigo-600 focus:ring-indigo-500" />
              <span className="text-sm text-slate-600">$100 & Above</span>
           </label>
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;