import { createContext, useContext, useRef, type ReactNode } from 'react';
import styles from './Panel.module.css';
import { Backdrop } from '../Backdrop/Backdrop';
import { ScrollLock } from '../ScrollLock/ScrollLock';
import { ClosePanelButton } from '../ClosePanelButton/ClosePanelButton';
import { Transition } from 'react-transition-group';
import { WatchPathname } from '../WatchPathname/WatchPathname';

export const DURATION_MS = 200;

const PanelContext = createContext<{
  closePanel: () => void;
} | null>(null);

interface Props {
  children: ReactNode;
  position: 'right' | 'left';
  isOpen: boolean;
  closePanel: () => void;
}

export function Panel({ children, position, isOpen, closePanel }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <Transition mountOnEnter unmountOnExit nodeRef={ref} in={isOpen} timeout={DURATION_MS}>
      {(state) => (
        <>
          {state !== 'unmounted' && state !== 'exited' && (
            <>
              <Backdrop onClick={closePanel} />
              <ScrollLock />
            </>
          )}
          <div
            style={
              {
                '--animation-duration': `${DURATION_MS}ms`,
              } as React.CSSProperties
            }
            data-transition-state={state}
            ref={ref}
            className={styles.panel}
            data-position={position}
          >
            <ClosePanelButton onClick={closePanel} />
            <PanelContext value={{ closePanel }}>{children}</PanelContext>
          </div>
          <WatchPathname onPathChange={closePanel} />
        </>
      )}
    </Transition>
  );
}

export const usePanel = () => {
  const value = useContext(PanelContext);

  if (!value) {
    throw new Error('usePanel() must be used within Panel');
  }

  return value;
};
