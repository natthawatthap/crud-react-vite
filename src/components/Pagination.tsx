import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  onNextPage: () => void;
  onPrevPage: () => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  totalItems,
  onNextPage,
  onPrevPage,
}) => {
  return (
    <div>
      <button onClick={onPrevPage} disabled={currentPage === 1}>
        {"<"}
      </button>
      <span>
        Page {currentPage} of {totalPages}, Total: {totalItems}
      </span>
      <button onClick={onNextPage} disabled={currentPage === totalPages}>
        {">"}
      </button>
    </div>
  );
};

export default Pagination;
