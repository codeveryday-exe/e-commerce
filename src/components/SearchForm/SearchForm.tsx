import { useState } from 'react';
import styles from './SearchForm.module.css';
import { useLocation } from 'wouter';
import { Search } from 'lucide-react';

export function SearchForm() {
  const [isSearchPanelOpen, setIsSearchPanelOpen] = useState(false);

  const [searchValue, setSearchValue] = useState('');
  const [, setLocation] = useLocation();

  const handleSubmit = () => {
    if (!searchValue.trim()) return;
    setSearchValue('');
    setLocation(`/search?searchValue=${searchValue}`);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      {isSearchPanelOpen && (
        <input
          onChange={(e) => {
            setSearchValue(e.target.value);
          }}
          className={styles.search_input}
          value={searchValue}
          type="text"
          // eslint-disable-next-line jsx-a11y/no-autofocus
          autoFocus
          required
        />
      )}
      <button
        className={styles.search_btn}
        onClick={() => {
          setIsSearchPanelOpen((prev) => !prev);
        }}
        type={searchValue !== '' ? 'submit' : 'button'}
        title="Search"
      >
        <Search className={styles.search_btn} size={24} />
        <span className="sr-only">Search</span>
      </button>
    </form>
  );
}
