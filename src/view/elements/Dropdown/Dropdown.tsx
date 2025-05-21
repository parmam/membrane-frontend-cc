import {
  Children,
  FunctionComponent,
  ReactNode,
  cloneElement,
  isValidElement,
  useEffect,
  useRef,
  useState,
} from 'react';

import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';

import styles from './Dropdown.module.css';

export interface DropdownProps {
  children?: ReactNode;
  label: string;
  className?: string;
  onSelect?: <T>(value: T) => void;
}

export interface DropdownItemProps<T = unknown> {
  children?: ReactNode;
  value: T;
  onClick?: (value: T) => void;
}

export const DropdownItem = <T,>({
  children,
  value,
  onClick,
}: DropdownItemProps<T>): React.ReactElement => {
  const handleClick = () => {
    onClick?.(value);
  };

  return (
    <div className={styles.dropdownItem} onClick={handleClick}>
      {children}
    </div>
  );
};

const Dropdown = <T,>({
  children,
  label,
  className,
  onSelect,
}: DropdownProps): React.ReactElement => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleItemClick = <V,>(value: V) => {
    if (onSelect) {
      onSelect(value as unknown as T);
    }
    setIsOpen(false);
  };

  // Handle outside click to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div ref={dropdownRef} className={clsx(styles.dropdown, { [styles.open]: isOpen }, className)}>
      <div className={styles.dropdownToggle} onClick={handleToggle}>
        {label}
        <FontAwesomeIcon
          icon={faChevronDown}
          style={{
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0)',
            transition: 'transform 0.2s',
          }}
        />
      </div>
      <div className={styles.dropdownMenu}>{children}</div>
    </div>
  );
};

export default Dropdown;
