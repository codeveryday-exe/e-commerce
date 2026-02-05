import clsx from 'clsx';
import styles from './SubmitButton.module.css';

export default function SubmitButton({ children, className, ...rest }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button {...rest} className={clsx(styles.submit_button, className)}>
      {children}
    </button>
  );
}
