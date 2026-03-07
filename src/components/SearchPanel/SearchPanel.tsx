import { useState } from 'react';
import styles from './SearchPanel.module.css';
import { useLocation } from 'wouter';
import { Search } from 'lucide-react';
import { useDebounceValue } from 'usehooks-ts';
import { PredictiveSearchResults } from './PredictiveSearchProducts';
import { usePanel } from '../Panel/Panel';

export function SearchPanel() {
  const [, setLocation] = useLocation();
  const [searchValue, setSearchValue] = useState('');
  const debouncedSearchValue = useDebounceValue(searchValue, 250);

  const { closePanel } = usePanel();

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!searchValue.trim()) return;
    closePanel();
    setSearchValue('');
    setLocation(`/search?q=${encodeURIComponent(searchValue)}`);
  };

  return (
    <>
      <h2 className={styles.title}>Search</h2>
      <div className={styles.content_box}>
        <form action="/search" className={styles.form} onSubmit={handleSubmit}>
          <button className={styles.search_btn} type={searchValue !== '' ? 'submit' : 'button'} title="Search">
            <Search strokeWidth={1.25} className={styles.search_btn} size={24} />
            <span className="sr-only">Search</span>
          </button>

          <input
            name="q"
            onChange={(e) => {
              setSearchValue(e.target.value);
            }}
            className={styles.search_input}
            value={searchValue}
            type="text"
            placeholder="Search"
            // eslint-disable-next-line jsx-a11y/no-autofocus
            autoFocus
            required
          />
        </form>
      </div>
      <PredictiveSearchResults searchValue={debouncedSearchValue[0]} />
    </>
  );
}
