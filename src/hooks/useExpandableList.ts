import { useMemo, useState } from 'react';

const DEFAULT_VISIBLE = 5;

export function useExpandableList<T>(items: T[], initialCount = DEFAULT_VISIBLE) {
  const [expanded, setExpanded] = useState(false);

  const hasMore = items.length > initialCount;

  const visibleItems = useMemo(() => {
    if (expanded || !hasMore) return items;
    return items.slice(0, initialCount);
  }, [items, expanded, hasMore, initialCount]);

  const hiddenCount = hasMore ? items.length - initialCount : 0;

  return {
    expanded,
    setExpanded,
    visibleItems,
    hasMore,
    hiddenCount,
    expand: () => setExpanded(true),
  };
}
