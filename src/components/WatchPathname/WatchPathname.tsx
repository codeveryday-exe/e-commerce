import { useEffect, useEffectEvent, useRef } from 'react';
import { useLocation } from 'wouter';

/**
 * @example logs pathChange when path changes
 * <WatchPathname onPathChange={() => {console.log("pathChange")}} />
 *
 */

export function WatchPathname({
  onPathChange,
}: {
  onPathChange: (currentPathname: string, prevPathname: string) => void;
}) {
  const [pathname] = useLocation();
  const prevPathnameRef = useRef(pathname);
  const onChange = useEffectEvent(onPathChange);

  useEffect(() => {
    if (pathname !== prevPathnameRef.current) {
      onChange(pathname, prevPathnameRef.current);
      prevPathnameRef.current = pathname;
    }
  }, [pathname]);

  return null;
}
