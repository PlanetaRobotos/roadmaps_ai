'use client';

import RoadmapCard from './roadmap-card';
import { RoadmapModel } from '@/app/api/client';
import Loading from '@/app/dashboard/_components/loading';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from '@/components/ui/pagination';
import { useEffect, useRef, useState } from 'react';

interface RoadmapsListProps {
  roadmaps: RoadmapModel[];
  loading?: boolean;
  emptyMessage?: string;
}

export default function RoadmapsList({
  roadmaps,
  loading = false,
  emptyMessage = 'No roadmaps available.'
}: RoadmapsListProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Items per page
  const totalPages = Math.ceil(roadmaps.length / itemsPerPage);

  // Calculate the paginated items
  const paginatedItems = roadmaps.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const ref = useRef(null);

  useEffect(() => {
    // Ensure the code runs only on the client
    console.log('window', window);
    if (typeof window !== 'undefined') {
      console.log('page changed', currentPage);
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }
  }, [currentPage]);

  return loading ? (
    <Loading />
  ) : roadmaps.length === 0 ? (
    <div className="py-8 text-center">{emptyMessage}</div>
  ) : (
    <>
      {/* Roadmap Cards */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {paginatedItems.map((roadmap) =>
          roadmap ? (
            <RoadmapCard
              key={roadmap.id} // Use a unique identifier for the key
              id={roadmap.id}
              title={roadmap.title}
              description={roadmap.description}
              topic={roadmap.topic}
              estimatedDuration={roadmap.estimatedDuration}
              tags={roadmap.tags}
            />
          ) : null
        )}
      </div>

      {/* Pagination Component */}
      <div className="mt-8 flex justify-center">
        <Pagination>
          <PaginationContent>
            <PaginationPrevious
              onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
              className={
                currentPage === 1 ? 'cursor-not-allowed opacity-50' : ''
              }
              // disabled={currentPage === 1}
            />
            {currentPage > 2 && (
              <>
                <PaginationItem>
                  <PaginationLink onClick={() => handlePageChange(1)}>
                    1
                  </PaginationLink>
                </PaginationItem>
                {currentPage > 3 && <PaginationEllipsis />}
              </>
            )}
            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .filter(
                (page) =>
                  page === currentPage ||
                  page === currentPage - 1 ||
                  page === currentPage + 1
              )
              .map((page) => (
                <PaginationItem key={page}>
                  <PaginationLink
                    isActive={page === currentPage}
                    onClick={() => handlePageChange(page)}
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              ))}
            {currentPage < totalPages - 1 && (
              <>
                {currentPage < totalPages - 2 && <PaginationEllipsis />}
                <PaginationItem>
                  <PaginationLink onClick={() => handlePageChange(totalPages)}>
                    {totalPages}
                  </PaginationLink>
                </PaginationItem>
              </>
            )}
            <PaginationNext
              onClick={() =>
                handlePageChange(Math.min(totalPages, currentPage + 1))
              }
              className={
                currentPage === totalPages
                  ? 'cursor-not-allowed opacity-50'
                  : ''
              }
              // disabled={currentPage === totalPages}
            />
          </PaginationContent>
        </Pagination>
      </div>
    </>
  );
}
