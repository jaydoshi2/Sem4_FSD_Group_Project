import React from 'react';

const SkeletonLoader = () => {
    return (
        <div className="flex">
            {/* Sidebar Skeleton */}
            <div className="w-[250px] bg-indigo-200 p-4 space-y-4">
                <div className="h-8 w-48 bg-gray-300 rounded-md"></div> {/* Course Progress Title */}
                <div className="space-y-3">
                    {/* Skeletons for Chapter Titles */}
                    {[1, 2, 3].map((_, idx) => (
                        <div key={idx} className="space-y-2">
                            <div className="h-6 w-40 bg-gray-300 rounded-md"></div> {/* Chapter */}
                            <div className="ml-4 space-y-2">
                                <div className="h-5 w-32 bg-gray-300 rounded-md"></div> {/* Video */}
                                <div className="h-5 w-32 bg-gray-300 rounded-md"></div> {/* Video */}
                                <div className="h-5 w-32 bg-gray-300 rounded-md"></div> {/* Video */}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Main Content Skeleton */}
            <div className="flex-grow p-6 space-y-6">
                {/* Course Progress Title */}
                <div className="h-8 w-48 bg-gray-300 rounded-md"></div>

                {/* Progress Bar */}
                <div className="w-full bg-gray-200 h-4 rounded-full">
                    <div className="h-4 bg-gray-400 rounded-full animate-pulse"></div>
                </div>

                {/* Chapters List */}
                <div className="space-y-4">
                    {[1, 2, 3].map((_, idx) => (
                        <div key={idx} className="flex items-center space-x-4">
                            <div className="h-5 w-20 bg-gray-300 rounded-md"></div>
                            <div className="h-5 w-32 bg-gray-300 rounded-md"></div>
                        </div>
                    ))}
                </div>

                {/* Video Player Placeholder */}
                <div className="w-full h-64 bg-gray-300 rounded-lg animate-pulse"></div>

                {/* Like/Dislike Buttons */}
                <div className="flex space-x-4 mt-4">
                    <div className="h-12 w-24 bg-gray-300 rounded-md"></div>
                    <div className="h-12 w-24 bg-gray-300 rounded-md"></div>
                </div>

                {/* MCQ Button */}
                <div className="mt-4 h-12 w-36 bg-gray-300 rounded-md"></div>
            </div>
        </div>
    );
};

export default SkeletonLoader;
