import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaGreaterThan,
  FaLessThan,
  FaAngleDoubleLeft,
  FaAngleDoubleRight,
  FaChevronDown,
} from "react-icons/fa";
import BodyOne from "@/components/typography/BodyOne";

interface BackendPagination {
  total: number;
  page: number; // 1-based
  limit: number;
  totalPages: number;
}

export interface PaginationProps {
  pagination: BackendPagination;
  onPageChange: (newPage: number) => void;
  onLimitChange?: (newLimit: number) => void;
  isLoading?: boolean;
}

const Pagination = ({
  pagination,
  onPageChange,
  onLimitChange,
  isLoading = false,
}: PaginationProps) => {
  const { total, page, limit, totalPages } = pagination;
  const [pagesToShow, setPagesToShow] = useState<number[]>([]);
  const [showPageInput, setShowPageInput] = useState(false);
  const [pageInputValue, setPageInputValue] = useState("");
  const [showLimitDropdown, setShowLimitDropdown] = useState(false);

  const pageIndex = page - 1;

  // Common page limits for selection
  const limitOptions = [5, 10, 20, 50, 100];

  useEffect(() => {
    const getPageNumbers = () => {
      const totalToShow = 5;

      if (totalPages <= totalToShow) {
        return Array.from({ length: totalPages }, (_, i) => i);
      }

      let start = Math.max(0, pageIndex - 2);
      let end = start + totalToShow - 1;

      if (end >= totalPages) {
        end = totalPages - 1;
        start = end - (totalToShow - 1);
      }

      return Array.from({ length: end - start + 1 }, (_, i) => start + i);
    };

    setPagesToShow(getPageNumbers());
  }, [pageIndex, pagination, totalPages]);

  const handlePageJump = (targetPage: number) => {
    const clampedPage = Math.max(1, Math.min(targetPage, totalPages));
    onPageChange(clampedPage);
  };

  const handlePageInputSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const targetPage = parseInt(pageInputValue);
    if (!isNaN(targetPage) && targetPage >= 1 && targetPage <= totalPages) {
      handlePageJump(targetPage);
    }
    setPageInputValue("");
    setShowPageInput(false);
  };

  const handleLimitChange = (newLimit: number) => {
    if (onLimitChange) {
      onLimitChange(newLimit);
    } else {
      // Fallback: Calculate what the current page should be with the new limit
      const currentFirstItem = (page - 1) * limit + 1;
      const newPage = Math.ceil(currentFirstItem / newLimit);
      onPageChange(newPage);
    }
    setShowLimitDropdown(false);
  };

  const skip5Pages = (direction: "forward" | "backward") => {
    const targetPage =
      direction === "forward"
        ? Math.min(page + 5, totalPages)
        : Math.max(page - 5, 1);
    handlePageJump(targetPage);
  };

  return (
    <motion.div
      className="flex items-center justify-between h-[48px] w-full bg-[#FCFCFC] rounded-b-[4px] text-text-3-brand"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Results info and records per page */}
      <div className="flex items-center gap-4">
        <div className="text-sm">
          <BodyOne className="font-[600] text-grey-5-brand">
            Showing {Math.min(pageIndex * limit + 1, total)} to{" "}
            {Math.min(page * limit, total)} of {total} results
          </BodyOne>
        </div>

        {/* Records per page selector */}
        <div className="relative">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowLimitDropdown(!showLimitDropdown)}
            className="flex items-center gap-1 px-2 py-1 text-xs bg-white rounded border hover:bg-gray-50 transition-colors"
            disabled={isLoading}
          >
            <span>{limit} per page</span>
            <motion.div
              animate={{ rotate: showLimitDropdown ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <FaChevronDown size="0.6rem" />
            </motion.div>
          </motion.button>

          <AnimatePresence>
            {showLimitDropdown && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.15 }}
                className="absolute bottom-full mb-1 left-0 bg-white border rounded shadow-lg z-10 min-w-[100px]"
              >
                {limitOptions.map((option) => (
                  <motion.button
                    key={option}
                    whileHover={{ backgroundColor: "#f3f4f6" }}
                    onClick={() => handleLimitChange(option)}
                    className={`w-full px-3 py-2 text-left text-xs hover:bg-gray-100 first:rounded-t last:rounded-b transition-colors ${
                      option === limit
                        ? "bg-blue-50 text-blue-600 font-medium"
                        : ""
                    }`}
                  >
                    {option} per page
                  </motion.button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation controls */}
      <div className="flex items-center gap-1 bg-white py-[3px] px-[20px] rounded-[6px]">
        {/* First page / Skip backward */}
        <motion.button
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.05 }}
          onClick={() => handlePageJump(1)}
          disabled={page === 1 || isLoading}
          className="px-2 py-1 rounded disabled:opacity-50 hover:bg-white/50 transition-colors"
          title="First page"
        >
          <FaAngleDoubleLeft size="0.75rem" />
        </motion.button>

        {/* Skip 5 pages backward */}
        <motion.button
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.05 }}
          onClick={() => skip5Pages("backward")}
          disabled={page <= 5 || isLoading}
          className="px-2 py-1 rounded disabled:opacity-50 hover:bg-white/50 transition-colors text-xs"
          title="Skip 5 pages back"
        >
          -5
        </motion.button>

        {/* Previous page */}
        <motion.button
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.05 }}
          onClick={() => onPageChange(page - 1)}
          disabled={page === 1 || isLoading}
          className="px-2 py-1 rounded disabled:opacity-50 hover:bg-white/50 transition-colors"
          title="Previous page"
        >
          <FaLessThan size="0.75rem" />
        </motion.button>

        {/* Page numbers */}
        {pagesToShow.map((pageNum, index) => (
          <motion.button
            key={index}
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.05 }}
            onClick={() => onPageChange(pageNum + 1)}
            disabled={isLoading}
            className={`px-3 py-1 rounded transition-colors duration-200 min-w-[32px] ${
              pageIndex === pageNum
                ? "bg-primary text-white shadow-sm"
                : "hover:bg-white/70"
            }`}
          >
            <BodyOne className="font-[600]">{pageNum + 1}</BodyOne>
          </motion.button>
        ))}

        {/* Page jump input */}
        <div className="relative">
          <AnimatePresence>
            {showPageInput ? (
              <motion.form
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                exit={{ opacity: 0, width: 0 }}
                onSubmit={handlePageInputSubmit}
                className="flex items-center"
              >
                <input
                  type="number"
                  min="1"
                  max={totalPages}
                  value={pageInputValue}
                  onChange={(e) => setPageInputValue(e.target.value)}
                  onBlur={() => {
                    setTimeout(() => setShowPageInput(false), 150);
                  }}
                  autoFocus
                  className="w-16 px-2 py-1 text-xs border rounded text-center"
                  placeholder={page.toString()}
                />
              </motion.form>
            ) : (
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                whileTap={{ scale: 0.95 }}
                whileHover={{ scale: 1.05 }}
                onClick={() => setShowPageInput(true)}
                disabled={isLoading}
                className="px-2 py-1 rounded hover:bg-white/50 transition-colors text-xs"
                title="Jump to page"
              >
                ...
              </motion.button>
            )}
          </AnimatePresence>
        </div>

        {/* Next page */}
        <motion.button
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.05 }}
          onClick={() => onPageChange(page + 1)}
          disabled={page === totalPages || isLoading}
          className="px-2 py-1 rounded disabled:opacity-50 hover:bg-white/50 transition-colors"
          title="Next page"
        >
          <FaGreaterThan size="0.75rem" />
        </motion.button>

        {/* Skip 5 pages forward */}
        <motion.button
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.05 }}
          onClick={() => skip5Pages("forward")}
          disabled={page >= totalPages - 4 || isLoading}
          className="px-2 py-1 rounded disabled:opacity-50 hover:bg-white/50 transition-colors text-xs"
          title="Skip 5 pages forward"
        >
          +5
        </motion.button>

        {/* Last page */}
        <motion.button
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.05 }}
          onClick={() => handlePageJump(totalPages)}
          disabled={page === totalPages || isLoading}
          className="px-2 py-1 rounded disabled:opacity-50 hover:bg-white/50 transition-colors"
          title="Last page"
        >
          <FaAngleDoubleRight size="0.75rem" />
        </motion.button>
      </div>
    </motion.div>
  );
};

export default Pagination;
