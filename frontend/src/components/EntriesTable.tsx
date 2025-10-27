import React, { useRef, useCallback } from 'react';
import useInfiniteEntries from '../hooks/useInfiniteEntries';
import EntryRow from './EntryRow';

export default function EntriesTable() {
  const { entries, loadMore, hasMore } = useInfiniteEntries(20);
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

  return (
    <div className="bg-white rounded shadow overflow-hidden">
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
            {entries.map((e, idx) => (
              <EntryRow key={e.id} entry={e} />
            ))}
          </tbody>
        </table>
        <div ref={lastRef as any} className="p-4 text-center">
          {hasMore ? 'Loading more...' : 'No more entries'}
        </div>
      </div>
    </div>
  );
}
