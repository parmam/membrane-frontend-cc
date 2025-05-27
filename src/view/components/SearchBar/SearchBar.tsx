import { ChangeEvent, FunctionComponent, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import Icon from '@view/elements/Icon/Icon';

import styles from './SearchBar.module.css';

interface SearchBarProps {
  placeholder?: string;
  onSearch?: (value: string) => void;
}

const SearchBar: FunctionComponent<SearchBarProps> = ({ placeholder, onSearch }) => {
  const { t } = useTranslation();
  const [searchValue, setSearchValue] = useState<string>('');

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchValue(value);
    onSearch?.(value);
  };

  return (
    <div className={styles.searchBarContainer}>
      <div className={styles.searchIconContainer}>
        <Icon icon={faMagnifyingGlass} className={styles.searchIcon} />
      </div>
      <input
        type='text'
        className={styles.searchInput}
        placeholder={placeholder || t('common.search')}
        value={searchValue}
        onChange={handleChange}
      />
    </div>
  );
};

export default SearchBar;
