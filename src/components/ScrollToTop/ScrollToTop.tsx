import { WatchPathname } from '../WatchPathname/WatchPathname';

export default function ScrollToTop() {
  return (
    <WatchPathname
      onPathChange={() => {
        window.scrollTo(0, 0);
      }}
    />
  );
}
