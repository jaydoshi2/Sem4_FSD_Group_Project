import React from 'react'

const TrendingSkeleton = () => {

    return (
        <div className="flex flex-wrap justify-center space-x-4">
            {[...Array(4)].map((_, index) => (
                <div key={index} className="min-w-[25%] p-4">
                    <div className="bg-indigo-50 shadow-lg rounded-lg overflow-hidden border border-indigo-950 p-2">
                        {/* Skeleton image */}
                        <div className="bg-gray-300 h-40 sm:h-50 md:h-60 lg:h-68 w-full animate-pulse"></div>

                        <div className="p-4">
                            {/* Skeleton title */}
                            <div className="h-6 bg-gray-300 rounded w-3/4 mx-auto animate-pulse"></div>

                            {/* Skeleton button */}
                            <div className="mt-4 flex justify-center">
                                <div className="bg-gray-300 h-10 w-1/2 rounded-lg animate-pulse"></div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>)

}

export default TrendingSkeleton
