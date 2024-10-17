import React from 'react';

const SkeletonSubNavbar = () => {
    return (
        <div className="flex overflow-x-hidden w-full">
            {Array(9).fill().map((_, index) => (
                <div
                    key={index}
                    className="h-7 w-36 bg-indigo-100 rounded-md mx-2 animate-pulse flex-shrink-0"
                ></div>
            ))}
        </div>
    );
};

export default SkeletonSubNavbar;
