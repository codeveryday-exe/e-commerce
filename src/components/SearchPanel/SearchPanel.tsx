import { useState } from 'react';
import styles from './SearchPanel.module.css';
import { useLocation } from 'wouter';
import { Search } from 'lucide-react';
import { ScrollLock } from '../ScrollLock/ScrollLock';
import { ClosePanelButton } from '../ClosePanelButton/ClosePanelButton';
import { Backdrop } from '../Backdrop/Backdrop';

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
      <Backdrop onClick={closeSearchPanel} />
      <ScrollLock />
      <div className={styles.search_panel}>
        <ClosePanelButton onClick={closeSearchPanel} />
        <h2 className={styles.title}>Search</h2>
        <div className={styles.content_box}>
          <button className={styles.search_btn} type={searchValue !== '' ? 'submit' : 'button'} title="Search">
            <Search strokeWidth={1.25} className={styles.search_btn} size={24} />
            <span className="sr-only">Search</span>
          </button>
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
                placeholder="Search"
                // eslint-disable-next-line jsx-a11y/no-autofocus
                autoFocus
                required
              />
            )}
          </form>
        </div>
      </div>
    </>
  );
}
