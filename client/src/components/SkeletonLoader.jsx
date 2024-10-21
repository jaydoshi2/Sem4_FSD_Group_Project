import React from 'react';

const SkeletonLoader = () => {
  return (
    <div className="bg-indigo-50 rounded-xl border border-indigo-200 p-4 shadow-md mt-6">
      <div className="h-48 bg-indigo-200 rounded-t-lg mb-4 animate-pulse"></div>
      <div className="h-4 bg-indigo-200 rounded w-3/4 mx-auto mb-3 animate-pulse"></div>
      <div className="h-4 bg-indigo-200 rounded w-1/2 mx-auto animate-pulse"></div>
    </div>
  );
};

export default SkeletonLoader;
