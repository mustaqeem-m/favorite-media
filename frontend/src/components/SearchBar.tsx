// frontend/src/components/SearchBar.tsx
import React from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';

type Props = {
  q: string;
  typeFilter: string;
  setQ: (s: string) => void;
  setTypeFilter: (s: string) => void;
  onClear?: () => void;
};

export default function SearchBar({
  q,
  typeFilter,
  setQ,
  setTypeFilter,
  onClear,
}: Props) {
  return (
    <div className="flex gap-3 items-center mb-4">
      <div className="flex-1">
        <Input
          placeholder="Search by title, director, location..."
          value={q}
          onChange={(e) => setQ(e.target.value)}
          className="pr-12"
        />
      </div>

      <select
        value={typeFilter}
        onChange={(e) => setTypeFilter(e.target.value)}
        className="rounded-md border px-3 py-2 text-sm bg-white"
      >
        <option value="">All</option>
        <option value="Movie">Movie</option>
        <option value="TV Show">TV Show</option>
      </select>

      <Button
        variant="outline"
        onClick={() => {
          setQ('');
          setTypeFilter('');
          onClear && onClear();
        }}
      >
        Clear
      </Button>
    </div>
  );
}
