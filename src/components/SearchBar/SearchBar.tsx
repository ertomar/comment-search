import type React from "react";
import { useCallback, useMemo, useState } from "react";
import { Search } from "lucide-react";

import { Input } from "../Input";
import { Button } from "../Button";

interface SearchBarProps {
  onSubmit: (query?: string) => void;
  disabled?: boolean;
}

export default function SearchBar({ onSubmit, disabled }: SearchBarProps) {
  const [query, setQuery] = useState("");
  const isQueryValid = useMemo(() => query.trim().length >= 3, [query]);

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (isQueryValid) {
        onSubmit(query);
      }
    },
    [query, onSubmit, isQueryValid]
  );

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="relative flex flex-col gap-1">
        <div className="relative flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search comments..."
              disabled={disabled}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              data-testid="search-input"
            />
          </div>

          <Button
            type="submit"
            disabled={query.trim().length < 3}
            className="h-14 rounded-xl px-8 shadow-lg shadow-primary/20 transition-all hover:shadow-primary/30"
          >
            Search
          </Button>
        </div>
        <small className="text-muted-foreground">
          Enter at least 3 characters to begin your search.
        </small>
      </div>
    </form>
  );
}
