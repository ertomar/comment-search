"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  onPageChange: (page: number) => void;
  hasNextPage?: boolean;
  hasPreviousPage?: boolean;
}

export default function Pagination({
  currentPage,
  onPageChange,
  hasNextPage = true,
  hasPreviousPage,
}: PaginationProps) {
  const canGoPrevious = hasPreviousPage ?? currentPage > 1;
  const canGoNext = hasNextPage;

  const handlePrevious = () => {
    if (canGoPrevious) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (canGoNext) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <nav
      className="flex items-center justify-center gap-2"
      aria-label="Pagination"
    >
      {/* Previous Button */}
      <button
        onClick={handlePrevious}
        disabled={!canGoPrevious}
        className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium rounded-lg border border-border bg-background hover:bg-accent hover:text-accent-foreground transition-colors disabled:opacity-50 disabled:pointer-events-none"
        aria-label="Previous page"
      >
        <ChevronLeft className="h-4 w-4" />
        <span>Previous</span>
      </button>

      {/* Current Page Indicator */}
      <div className="flex items-center gap-2 px-4">
        <span className="text-sm font-medium text-gray-500">Page</span>
        <span className="min-w-8 h-10 px-3 flex items-center justify-center text-sm font-semibold rounded-lg bg-primary text-primary-foreground shadow-sm">
          {currentPage}
        </span>
      </div>

      {/* Next Button */}
      <button
        onClick={handleNext}
        disabled={!canGoNext}
        className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium rounded-lg border border-border bg-background hover:bg-accent hover:text-accent-foreground transition-colors disabled:opacity-50 disabled:pointer-events-none"
        aria-label="Next page"
      >
        <span>Next</span>
        <ChevronRight className="h-4 w-4" />
      </button>
    </nav>
  );
}
