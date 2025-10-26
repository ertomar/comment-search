import type { Comment } from "@/types";

import { CommentCard } from "../CommentCard";
import { useMemo } from "react";
import { Search } from "lucide-react";

export default function CommentsSection({
  comments,
  isLoading,
  isError,
  hasSearch,
}: {
  comments: Comment[];
  isLoading: boolean;
  isError: boolean;
  hasSearch: boolean;
}) {
  const isEmpty = useMemo(
    () => comments.length === 0 && !isLoading && !isError,
    [comments, isLoading, isError]
  );

  return (
    <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      {isLoading && (
        <div className="flex flex-col items-center justify-center py-16">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary/20 border-t-primary" />
          <p className="mt-4 text-sm text-muted-foreground">
            Searching comments...
          </p>
        </div>
      )}

      {!isEmpty && !isLoading && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-medium text-muted-foreground">
              Showing {comments.length} result(s)
            </h2>
          </div>
          <div className="grid gap-4">
            {comments.map((comment) => (
              <CommentCard key={comment.id} comment={comment} />
            ))}
          </div>
        </div>
      )}

      {isEmpty && !hasSearch && (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="rounded-full bg-secondary p-4">
            <Search className="h-8 w-8 text-secondary-foreground/60" />
          </div>
          <h3 className="mt-4 text-lg font-semibold text-foreground">
            Start searching
          </h3>
          <p className="mt-2 max-w-sm text-pretty text-sm text-muted-foreground">
            Enter a search term above to find relevant comments
          </p>
        </div>
      )}

      {isEmpty && hasSearch && (
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-muted/30 py-16">
          <div className="rounded-full bg-muted p-4">
            <Search className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="mt-4 text-lg font-semibold text-foreground">
            No comments found
          </h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Try adjusting your search query
          </p>
        </div>
      )}

      {isError && (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="rounded-full bg-secondary p-4">
            <Search className="h-8 w-8 text-secondary-foreground/60" />
          </div>
          <h3 className="mt-4 text-lg font-semibold text-foreground">
            Error loading comments
          </h3>
          <p className="mt-2 max-w-sm text-pretty text-sm text-muted-foreground">
            Please try again later
          </p>
        </div>
      )}
    </section>
  );
}
