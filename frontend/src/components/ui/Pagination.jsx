import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';

const Pagination = ({ currentPage, totalPages, total, limit, onPageChange }) => {
  if (!total) return null;

  const start = (currentPage - 1) * limit + 1;
  const end = Math.min(currentPage * limit, total);

  const getPages = () => {
    const pages = [];
    const delta = 1;
    const left = Math.max(2, currentPage - delta);
    const right = Math.min(totalPages - 1, currentPage + delta);

    pages.push(1);
    if (left > 2) pages.push('...');
    for (let i = left; i <= right; i++) pages.push(i);
    if (right < totalPages - 1) pages.push('...');
    if (totalPages > 1) pages.push(totalPages);

    return pages;
  };

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-1 pt-4">

      {/* Info */}
      <div className="flex items-center gap-2">
        <span className="text-xs text-gray-400 font-medium">Showing</span>
        <span className="text-xs font-bold text-gray-700 bg-gray-100 px-2.5 py-1 rounded-lg">
          {start}–{end}
        </span>
        <span className="text-xs text-gray-400 font-medium">
          of <span className="font-bold text-gray-600">{total}</span> students
        </span>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-1">
        {/* First — hidden on mobile */}
        <button
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
          className="hidden sm:flex w-8 h-8 items-center justify-center rounded-xl border border-gray-200 text-gray-400 hover:border-blue-400 hover:text-blue-600 hover:bg-blue-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          title="First page"
        >
          <ChevronsLeft size={14} />
        </button>

        {/* Prev */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="w-8 h-8 flex items-center justify-center rounded-xl border border-gray-200 text-gray-400 hover:border-blue-400 hover:text-blue-600 hover:bg-blue-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          title="Previous page"
        >
          <ChevronLeft size={14} />
        </button>

        {/* Page numbers — hidden on very small screens */}
        <div className="hidden xs:flex sm:flex items-center gap-1">
          {getPages().map((page, idx) =>
            page === '...' ? (
              <span key={`e-${idx}`} className="w-8 h-8 flex items-center justify-center text-gray-400 text-xs font-bold">
                ···
              </span>
            ) : (
              <button
                key={page}
                onClick={() => onPageChange(page)}
                className={`w-8 h-8 flex items-center justify-center rounded-xl text-xs font-bold transition-all ${
                  currentPage === page
                    ? 'bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-200 scale-105'
                    : 'border border-gray-200 text-gray-600 hover:border-blue-400 hover:text-blue-600 hover:bg-blue-50'
                }`}
              >
                {page}
              </button>
            )
          )}
        </div>

        {/* Mobile: current/total indicator */}
        <div className="flex sm:hidden items-center px-3 h-8 rounded-xl border border-gray-200 text-xs font-bold text-gray-700">
          {currentPage} / {totalPages}
        </div>

        {/* Next */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="w-8 h-8 flex items-center justify-center rounded-xl border border-gray-200 text-gray-400 hover:border-blue-400 hover:text-blue-600 hover:bg-blue-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          title="Next page"
        >
          <ChevronRight size={14} />
        </button>

        {/* Last — hidden on mobile */}
        <button
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages}
          className="hidden sm:flex w-8 h-8 items-center justify-center rounded-xl border border-gray-200 text-gray-400 hover:border-blue-400 hover:text-blue-600 hover:bg-blue-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          title="Last page"
        >
          <ChevronsRight size={14} />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
