import { useState } from "react";

import { useComments } from "@/queries/comment";
import { Pagination } from "@/components";

import { SearchSection } from "./components/SearchSection";
import { CommentsSection } from "./components/CommentsSection";

const LIMIT = 20;

export default function CommentsList() {
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState<string | undefined>(undefined);
  const {
    data: comments,
    isFetching,
    isError,
  } = useComments({ query, page, limit: LIMIT });

  return (
    <main className="py-6">
      <SearchSection onSubmit={(query) => setQuery(query)} />
      <CommentsSection
        comments={comments || []}
        isLoading={isFetching}
        isError={isError}
        hasSearch={!!query}
      />
      {comments?.length && (
        <Pagination
          currentPage={page}
          onPageChange={setPage}
          hasNextPage={comments?.length === LIMIT}
          hasPreviousPage={page > 1}
        />
      )}
    </main>
  );
}
