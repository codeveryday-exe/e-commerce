import { useEffect, useEffectEvent } from 'react';
import { useLocation } from 'wouter';

/**
 * @example logs pathChange when path changes
 * <WatchPathname onPathChange={() => {console.log("pathChange")}} />
 *
 */

export function WatchPathname({ onPathChange }: { onPathChange: () => void }) {
  const [pathname] = useLocation();
  const onChange = useEffectEvent(onPathChange);

  useEffect(() => {
    onChange();
  }, [pathname]);

  return null;
}
