import React from 'react';

interface PaginationProps {
  pageNumber: number;
 
  totalItems: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ pageNumber, totalItems, onPageChange }) => {
  const totalPages = Math.ceil(totalItems / 10);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  return (
    <div className="btn-group flex gap-2 mt-3">
      <button
        className="btn btn-primary"
        disabled={pageNumber === 1}
        onClick={() => handlePageChange(pageNumber - 1)}
      >
        «
      </button>
      {Array.from({ length: totalPages }, (_, index) => (
        <button
          key={index + 1}
          className={`btn ${pageNumber === index + 1 ? 'btn-active' : ''}`}
          onClick={() => handlePageChange(index + 1)}
        >
          {index + 1}
        </button>
      ))}
      <button
        className="btn btn-warning"
        disabled={pageNumber === totalPages}
        onClick={() => handlePageChange(pageNumber + 1)}
      >
        »
      </button>
    </div>
  );
};

export default Pagination;
