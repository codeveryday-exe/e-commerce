import { SubmitButton } from '../SubmitButton/SubmitButton';
import styles from './ProductFilter.module.css';

export function ProductFilter({ onSubmit, onReset }: { onSubmit: (data: string) => void; onReset: () => void }) {
  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const filter = formData.get('filter');

    if (typeof filter !== 'string' || filter.trim() === '') return;
    console.log(filter);
    onSubmit(filter.trim());
  };
  return (
    <form onSubmit={handleSubmit} className={styles.filter_form}>
      <label className={styles.filter_section}>
        <span>Filter: </span>
        <input className={styles.filter_input} type="text" name="filter" />
      </label>

      <SubmitButton onClick={onReset} type="button" className={styles.reset_btn}>
        Reset Filters
      </SubmitButton>
    </form>
  );
}
