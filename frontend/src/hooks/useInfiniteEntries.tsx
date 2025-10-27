import { useCallback, useEffect, useRef, useState } from 'react';
import { fetchEntries } from '../lib/api';

export default function useInfiniteEntries(limit = 20) {
  const [entries, setEntries] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const loadingRef = useRef(false);

  const loadMore = useCallback(async () => {
    if (loadingRef.current || !hasMore) return;
    loadingRef.current = true;
    try {
      const json = await fetchEntries(page, limit);
      setEntries((prev) => [...prev, ...json.data]);
      setPage((p) => p + 1);
      if (entries.length + json.data.length >= json.total) setHasMore(false);
    } catch (err) {
      console.error(err);
    } finally {
      loadingRef.current = false;
    }
  }, [page, limit, hasMore, entries.length]);

  useEffect(() => {
    loadMore();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { entries, setEntries, loadMore, hasMore };
}
