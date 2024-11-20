import React from 'react';
interface PaginationProp {
    currentPage: number;
    totalPages: number;
    prevPage: () => void;
    nextPage: () => void;
}

const Pagination: React.FC<PaginationProp> = ({ currentPage, totalPages, prevPage, nextPage }) => (
    <div>
        {totalPages > 0 && (
            <div>
                <button onClick={prevPage} disabled={currentPage === 1}>
                    Previous
                </button>
                <button onClick={nextPage} disabled={currentPage === totalPages}>
                    Next
                </button>
            </div>
        )}
    </div>
)

export default Pagination;