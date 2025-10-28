// frontend/src/components/EntriesTable.tsx
import React, { useRef, useCallback } from 'react';
import useInfiniteEntries from '../hooks/useInfiniteEntries';
import EntryRow from './EntryRow';
import EntryForm from './EntryForm';

type Props = {
  adding: boolean;
  setAdding: (v: boolean) => void;
};

export default function EntriesTable({ adding, setAdding }: Props) {
  const { entries, loadMore, hasMore, setEntries } = useInfiniteEntries(20);

  // debug print so we can verify the prop flows
  console.log(
    'EntriesTable mounted. props.adding=',
    adding,
    'entries.length=',
    entries.length
  );

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

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100">
      {/* Table scroll area */}
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
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {entries.map((e: any) => (
              <EntryRow
                key={e.id}
                entry={e}
                onUpdated={handleUpdated}
                onDeleted={handleDeleted}
              />
            ))}
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
