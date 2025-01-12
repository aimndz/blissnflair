import { Event } from "../types/event";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
  PaginationLink,
} from "./ui/pagination";

function PaginationBar({
  itemsPerPage,
  filteredEvents,
  currentPage,
  handleSetCurrentPage,
  handleSetSearchParams,
}: {
  itemsPerPage: number;
  filteredEvents: Event[];
  currentPage: number;
  handleSetCurrentPage: (pageNumber: number) => void;
  handleSetSearchParams: (
    params: URLSearchParams | ((prev: URLSearchParams) => URLSearchParams),
  ) => void;
}) {
  const handlePageClick = (pageNumber: number) => {
    handleSetCurrentPage(pageNumber);
    handleSetSearchParams((prev) => {
      const params = new URLSearchParams(prev);
      params.set("page", String(pageNumber));
      return params;
    });
  };

  // Calculate total pages
  const totalPages = Math.ceil(filteredEvents.length / itemsPerPage);

  return (
    <Pagination className="mb-10 mt-3">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            className="cursor-pointer select-none p-3"
            size={"20px"}
            onClick={() => handlePageClick(Math.max(currentPage - 1, 1))}
          />
        </PaginationItem>

        {(() => {
          const pageNumbers = [];
          const totalPages = Math.ceil(filteredEvents.length / itemsPerPage);

          // Determine the range of pages to display
          if (currentPage <= 3) {
            // Show first few pages
            for (let i = 1; i <= Math.min(3, totalPages); i++) {
              pageNumbers.push(i);
            }
          } else if (currentPage > totalPages - 2) {
            // Show last few pages
            for (let i = totalPages - 2; i <= totalPages; i++) {
              pageNumbers.push(i);
            }
          } else {
            // Show current page with 1 before and 1 after
            for (let i = currentPage - 1; i <= currentPage + 1; i++) {
              pageNumbers.push(i);
            }
          }

          // Remove duplicates and sort
          const uniquePageNumbers = [...new Set(pageNumbers)].sort(
            (a, b) => a - b,
          );

          return uniquePageNumbers.map((pageNumber) => (
            <PaginationItem key={pageNumber}>
              <PaginationLink
                className={`aspect-square w-10 cursor-pointer p-3 ${currentPage === pageNumber ? "bg-primary-100 text-secondary-100 hover:bg-primary-200 hover:text-secondary-100" : "bg-secondary-100 text-secondary-800"} rounded-lg`}
                size={"20px"}
                onClick={() => handlePageClick(pageNumber)}
              >
                {pageNumber}
              </PaginationLink>
            </PaginationItem>
          ));
        })()}

        {(currentPage <= totalPages - 2 || currentPage <= totalPages - 1) &&
          totalPages > 3 && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}

        {(currentPage <= totalPages - 2 || currentPage <= totalPages - 1) &&
          totalPages > 3 && (
            <PaginationItem>
              <PaginationLink
                className={`aspect-square w-10 cursor-pointer p-3 ${currentPage === totalPages ? "bg-primary-100 text-secondary-100 hover:bg-primary-200 hover:text-secondary-100" : "bg-secondary-100 text-secondary-800"} rounded-lg`}
                size={"20px"}
                onClick={() => handlePageClick(totalPages)}
              >
                {totalPages}
              </PaginationLink>
            </PaginationItem>
          )}

        <PaginationItem>
          <PaginationNext
            size={"20px"}
            className="cursor-pointer select-none p-3"
            onClick={() =>
              handlePageClick(Math.min(currentPage + 1, totalPages))
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

export default PaginationBar;
