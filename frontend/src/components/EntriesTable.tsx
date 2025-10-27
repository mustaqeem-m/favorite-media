// frontend/src/components/EntriesTable.tsx
import React, { useRef, useCallback, useState } from 'react';
import useInfiniteEntries from '../hooks/useInfiniteEntries';
import EntryRow from './EntryRow';
import EntryForm, { EntryShape } from './EntryForm';

export default function EntriesTable() {
  // useInfiniteEntries returns setEntries so we can update state in-place
  const { entries, loadMore, hasMore, setEntries } = useInfiniteEntries(20);
  const [adding, setAdding] = useState(false);

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
    // put newly created entry at the start
    setEntries((prev: any[]) => [created, ...prev]);
  };

  return (
    <div className="bg-white rounded shadow overflow-hidden">
      <div className="p-4 flex justify-end">
        <button
          onClick={() => setAdding(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          + Add New
        </button>
      </div>

      <div className="table-scroll">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100 sticky top-0">
            <tr>
              <th className="p-3 text-left">Title</th>
              <th className="p-3 text-left">Type</th>
              <th className="p-3 text-left">Director</th>
              <th className="p-3 text-left">Budget</th>
              <th className="p-3 text-left">Location</th>
              <th className="p-3 text-left">Duration</th>
              <th className="p-3 text-left">Year/Time</th>
              <th className="p-3 text-left">Actions</th>
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

        <div ref={lastRef as any} className="p-4 text-center">
          {hasMore ? 'Loading more...' : 'No more entries'}
        </div>
      </div>

      {adding && (
        <EntryForm
          onClose={() => setAdding(false)}
          onSaved={(created) => {
            setAdding(false);
            handleAdded(created);
          }}
        />
      )}
    </div>
  );
}
