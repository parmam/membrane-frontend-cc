import { FunctionComponent, useEffect, useRef, useState } from 'react';

import { faCalendar, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';

import styles from './DateSelector.module.css';

interface DateSelectorProps {
  startDate: string | null;
  endDate: string | null;
  onDateChange: (startDate: string | null, endDate: string | null) => void;
  label?: string;
}

const DateSelector: FunctionComponent<DateSelectorProps> = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [localStartDate, setLocalStartDate] = useState(props.startDate);
  const [localEndDate, setLocalEndDate] = useState(props.endDate);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Formatea las fechas para mostrarlas en el botón
  const formatDisplayDate = () => {
    if (!props.startDate && !props.endDate) {
      return 'Seleccionar rango de fechas';
    }

    if (props.startDate && props.endDate) {
      const start = new Date(props.startDate);
      const end = new Date(props.endDate);
      return `${start.toLocaleDateString()} - ${end.toLocaleDateString()}`;
    }

    if (props.startDate) {
      const start = new Date(props.startDate);
      return `Desde ${start.toLocaleDateString()}`;
    }

    if (props.endDate) {
      const end = new Date(props.endDate);
      return `Hasta ${end.toLocaleDateString()}`;
    }

    return 'Seleccionar rango de fechas';
  };

  // Cierra el dropdown cuando se hace clic fuera
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

  // Actualiza los valores locales cuando cambian las props
  useEffect(() => {
    setLocalStartDate(props.startDate);
    setLocalEndDate(props.endDate);
  }, [props.startDate, props.endDate]);

  const handleApply = () => {
    props.onDateChange(localStartDate, localEndDate);
    setIsOpen(false);
  };

  const handleClear = () => {
    setLocalStartDate(null);
    setLocalEndDate(null);
    props.onDateChange(null, null);
    setIsOpen(false);
  };

  return (
    <div className={styles.dateSelector}>
      {props.label && <label className={styles.dateInputLabel}>{props.label}</label>}
      <div className={clsx(isOpen && styles.open)} ref={dropdownRef}>
        <button className={styles.selectorButton} onClick={() => setIsOpen(!isOpen)} type='button'>
          <div className={styles.buttonContent}>
            <FontAwesomeIcon icon={faCalendar} className={styles.icon} />
            <span>{formatDisplayDate()}</span>
          </div>
          <FontAwesomeIcon icon={faChevronDown} />
        </button>
        <div className={styles.dropdown}>
          <div className={styles.dateInputs}>
            <div className={styles.dateInputGroup}>
              <label className={styles.dateInputLabel}>Fecha de inicio</label>
              <input
                type='date'
                className={styles.dateInput}
                value={localStartDate || ''}
                onChange={(e) => setLocalStartDate(e.target.value || null)}
                max={localEndDate || undefined}
              />
            </div>
            <div className={styles.dateInputGroup}>
              <label className={styles.dateInputLabel}>Fecha de fin</label>
              <input
                type='date'
                className={styles.dateInput}
                value={localEndDate || ''}
                onChange={(e) => setLocalEndDate(e.target.value || null)}
                min={localStartDate || undefined}
              />
            </div>
          </div>
          <div className={styles.actionButtons}>
            <button
              className={clsx(styles.actionButton, styles.clearButton)}
              type='button'
              onClick={handleClear}
            >
              Limpiar
            </button>
            <button
              className={clsx(styles.actionButton, styles.applyButton)}
              type='button'
              onClick={handleApply}
            >
              Aplicar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DateSelector;
