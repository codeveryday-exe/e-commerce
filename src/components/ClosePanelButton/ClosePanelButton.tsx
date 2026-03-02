import { X } from 'lucide-react';
import styles from './ClosePanelButton.module.css';
import clsx from 'clsx';

export function ClosePanelButton({ className, ...rest }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button type="button" {...rest} className={clsx(styles.close_panel_button, className)}>
      <X size={28} />
      <span className="sr-only">Close</span>
    </button>
  );
}
