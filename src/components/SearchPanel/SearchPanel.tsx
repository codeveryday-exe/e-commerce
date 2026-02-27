import { useState } from 'react';
import styles from './SearchPanel.module.css';
import { useLocation } from 'wouter';
import { Search, X } from 'lucide-react';
import { ScrollLock } from '../ScrollLock/ScrollLock';

export function SearchPanel({
  isSearchPanelOpen,
  closeSearchPanel,
}: {
  isSearchPanelOpen: boolean;
  closeSearchPanel: () => void;
}) {
  const [searchValue, setSearchValue] = useState('');
  const [, setLocation] = useLocation();

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!searchValue.trim()) return;
    closeSearchPanel();
    setSearchValue('');
    setLocation(`/search?q=${encodeURIComponent(searchValue)}`);
  };

  return (
    <>
      <div aria-hidden onClick={closeSearchPanel} className={styles.backdrop_box} />
      <ScrollLock />
      <div className={styles.search_panel}>
        <button onClick={closeSearchPanel} className={styles.close_btn} type="button">
          <X size={28} />
          <span className="sr-only">Close cart</span>
        </button>
        <div className={styles.content_box}>
          <h2 className={styles.title}>Search</h2>
          <form action="/search" className={styles.form} onSubmit={handleSubmit}>
            {isSearchPanelOpen && (
              <input
                name="q"
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
            <button className={styles.search_btn} type={searchValue !== '' ? 'submit' : 'button'} title="Search">
              <Search className={styles.search_btn} size={24} />
              <span className="sr-only">Search</span>
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
