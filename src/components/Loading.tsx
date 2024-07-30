import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
      <span className="loading loading-spinner text-primary"></span>
    </div>
  );
};

export default LoadingSpinner;
