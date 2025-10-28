// frontend/src/components/EntriesTable.tsx
import React, {
  useRef,
  useCallback,
  useMemo,
  useState,
  useEffect,
} from 'react';
import useInfiniteEntries from '../hooks/useInfiniteEntries';
import EntryRow from './EntryRow';
import EntryForm from './EntryForm';
import SearchBar from './SearchBar';
import useDebounce from '../hooks/useDebounce';

type Props = {
  adding: boolean;
  setAdding: (v: boolean) => void;
};

export default function EntriesTable({ adding, setAdding }: Props) {
  const { entries, loadMore, hasMore, setEntries } = useInfiniteEntries(20);

  // search / filter state
  const [q, setQ] = useState('');
  const [typeFilter, setTypeFilter] = useState('');

  // debounce the search input to avoid rapid re-renders
  const debouncedQ = useDebounce(q, 300);

  // debug print so we can verify the prop flows
  console.log(
    'EntriesTable mounted. props.adding=',
    adding,
    'entries.length=',
    entries.length
  );

  // Intersection observer for infinite loading (unchanged)
  const observer = useRef<IntersectionObserver | null>(null);
  const lastRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (!node) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entriesObs) => {
        if (entriesObs[0].isIntersecting && hasMore) {
          loadMore();
        }
      });
      observer.current.observe(node);
    },
    [hasMore, loadMore]
  );

  const handleUpdated = (updated: any) => {
    setEntries((prev: any[]) =>
      prev.map((e) => (e.id === updated.id ? updated : e))
    );
  };

  const handleDeleted = (id: number) => {
    setEntries((prev: any[]) => prev.filter((e) => e.id !== id));
  };

  const handleAdded = (created: any) => {
    setEntries((prev: any[]) => [created, ...prev]);
  };

  // client-side filtering logic (case-insensitive)
  const filteredEntries = useMemo(() => {
    const qLower = debouncedQ.trim().toLowerCase();
    return entries.filter((e: any) => {
      if (typeFilter && e.type !== typeFilter) return false;
      if (!qLower) return true;
      // fields to search
      const hay = `${e.title ?? ''} ${e.director ?? ''} ${e.location ?? ''} ${
        e.notes ?? ''
      }`.toLowerCase();
      return hay.includes(qLower);
    });
  }, [entries, debouncedQ, typeFilter]);

  // If user clears search, we might want to reset infinite pagination (optional)
  useEffect(() => {
    if (!debouncedQ && !typeFilter) {
      // keep behavior simple: do nothing — entries remain loaded
      // if you want to re-fetch from page 1, modify useInfiniteEntries instead
    }
  }, [debouncedQ, typeFilter]);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
      {/* Search bar */}
      <SearchBar
        q={q}
        typeFilter={typeFilter}
        setQ={setQ}
        setTypeFilter={setTypeFilter}
        onClear={() => {}}
      />

      {/* Table */}
      <div className="overflow-auto">
        <table className="min-w-full table-fixed text-sm">
          <thead className="bg-gray-50 sticky top-0 z-10">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 uppercase tracking-wide">
                Title
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 uppercase tracking-wide">
                Type
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 uppercase tracking-wide">
                Director
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 uppercase tracking-wide">
                Budget
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 uppercase tracking-wide">
                Location
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 uppercase tracking-wide">
                Duration
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 uppercase tracking-wide">
                Year/Time
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 uppercase tracking-wide">
                Poster
              </th>

              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 uppercase tracking-wide">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {filteredEntries.length === 0 ? (
              <tr>
                <td colSpan={8} className="py-10 text-center text-gray-500">
                  No results match your search.
                </td>
              </tr>
            ) : (
              filteredEntries.map((e: any) => (
                <EntryRow
                  key={e.id}
                  entry={e}
                  onUpdated={handleUpdated}
                  onDeleted={handleDeleted}
                />
              ))
            )}
          </tbody>
        </table>

        {/* sentinel for infinite scroll */}
        <div
          ref={lastRef as any}
          className="p-4 text-center text-sm text-gray-500"
        >
          {hasMore ? 'Loading more...' : 'No more entries'}
        </div>
      </div>

      {/* modal rendered based on prop from App */}
      {adding && (
        <EntryForm
          onClose={() => setAdding(false)}
          onSaved={(created: any) => {
            setAdding(false);
            handleAdded(created);
          }}
        />
      )}
    </div>
  );
}
