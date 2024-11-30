import React from 'react';

const Pagination = ({ currentPage, setPage }) => {
  const handlePageChange = (pageNumber) => {
    setPage(pageNumber);
  };

  return (
    <div className="pagination">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        style={{ marginRight: '10px' }}
      >
        Предыдущие
      </button>
      <button onClick={() => handlePageChange(currentPage + 1)}>
        Следующие
      </button>
    </div>
  );
};

export default Pagination;
