"use client";

import { cn, generatePagination } from "@/lib/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useMemo } from "react";
import {
  PaginationEllipsis,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./ui/pagination";

type PaginationProps = {
  totalPages: number;
};

export const Pagination = ({ totalPages }: PaginationProps) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;
  const router = useRouter();

  const params = useMemo(
    () => new URLSearchParams(searchParams),
    [searchParams],
  );

  const createPageURL = (pageNumber: number | string) => {
    const newParams = new URLSearchParams(params);
    newParams.set("page", pageNumber.toString());
    return `${pathname}?${newParams.toString()}`;
  };

  const handlePageChange =
    (pageNumber: number | string) => (e: React.MouseEvent) => {
      e.preventDefault();
      const url = createPageURL(pageNumber);
      router.push(url, { scroll: false });
    };

  const allPages = generatePagination(currentPage, totalPages);

  return (
    <nav className="my-8 flex w-full items-center justify-center">
      <div className="flex items-center gap-1">
        {/* Previous button */}
        <PaginationPrevious
          className={cn({
            "pointer-events-none opacity-50": currentPage <= 1,
          })}
          href={createPageURL(currentPage - 1)}
          onClick={
            currentPage > 1 ? handlePageChange(currentPage - 1) : undefined
          }
        />

        {/* Pages */}
        {allPages.map((page, index) => {
          if (totalPages <= 1) return null;

          if (page === "...") {
            return <PaginationEllipsis key={`ellipsis-${index}`} />;
          }

          return (
            <PaginationLink
              key={`page-${page}`}
              href={createPageURL(page)}
              isActive={page === currentPage}
              onClick={handlePageChange(page)}
            >
              {page}
            </PaginationLink>
          );
        })}

        {/* Next button */}
        <PaginationNext
          className={cn({
            "pointer-events-none opacity-50":
              currentPage === totalPages || !totalPages,
          })}
          href={createPageURL(currentPage + 1)}
          onClick={
            currentPage < totalPages
              ? handlePageChange(currentPage + 1)
              : undefined
          }
        />
      </div>
    </nav>
  );
};
