import { Search } from "lucide-react";

import { SearchBar } from "@/components";

export default function SearchSection({
  onSubmit,
}: {
  onSubmit: (query?: string) => void;
}) {
  return (
    <div className="relative overflow-hidden border-b border-border bg-linear-to-b from-secondary/30 to-background">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-size-[24px_24px]" />
      <div className="relative mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="mb-6 inline-flex items-center justify-center rounded-full bg-primary/10 p-3 ring-1 ring-primary/20">
            <Search className="h-8 w-8 text-primary" />
          </div>
          <h1 className="mb-4 text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Comment Search
          </h1>
          <p className="mx-auto max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground sm:text-xl">
            Search through thousands of comments instantly. Start typing to
            begin your search.
          </p>
        </div>

        {/* Search Bar */}
        <div className="mt-10">
          <SearchBar onSubmit={onSubmit} />
        </div>
      </div>
    </div>
  );
}
