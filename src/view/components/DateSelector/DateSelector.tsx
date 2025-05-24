import { FunctionComponent, useEffect, useRef, useState } from 'react';

import {
  faCalendar,
  faChevronDown,
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';

import styles from './DateSelector.module.css';

interface DateSelectorProps {
  startDate: string | null;
  endDate: string | null;
  onDateChange: (startDate: string | null, endDate: string | null) => void;
  label?: string;
}

type ViewMode = 'calendar' | 'month' | 'year';

const DateSelector: FunctionComponent<DateSelectorProps> = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [localStartDate, setLocalStartDate] = useState(props.startDate);
  const [localEndDate, setLocalEndDate] = useState(props.endDate);
  const [viewMode, setViewMode] = useState<ViewMode>('calendar');
  const [currentDate, setCurrentDate] = useState(new Date());
  const [hoveredDate, setHoveredDate] = useState<Date | null>(null);
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

  // Navegación de meses
  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  // Obtiene los días del mes actual
  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  // Obtiene el primer día de la semana del mes
  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
  };

  // Formatea la fecha como YYYY-MM-DD
  const formatDateString = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // Maneja la selección de una fecha en el calendario
  const handleDateClick = (day: number) => {
    const selectedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    const dateString = formatDateString(selectedDate);

    if (!localStartDate || (localStartDate && localEndDate)) {
      // Si no hay fecha de inicio o ambas fechas están seleccionadas, establecer nueva fecha de inicio
      setLocalStartDate(dateString);
      setLocalEndDate(null);
    } else {
      // Si hay fecha de inicio pero no de fin
      const startDateObj = new Date(localStartDate);

      if (selectedDate < startDateObj) {
        // Si la fecha seleccionada es anterior a la fecha de inicio, invertir
        setLocalEndDate(localStartDate);
        setLocalStartDate(dateString);
      } else {
        // Si la fecha seleccionada es posterior a la fecha de inicio
        setLocalEndDate(dateString);
      }
    }
  };

  // Maneja la selección de un mes
  const handleMonthSelect = (month: number) => {
    setCurrentDate(new Date(currentDate.getFullYear(), month, 1));
    setViewMode('calendar');
  };

  // Maneja la selección de un año
  const handleYearSelect = (year: number) => {
    setCurrentDate(new Date(year, currentDate.getMonth(), 1));
    setViewMode('calendar');
  };

  // Genera el array de días para el mes actual
  const generateCalendarDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDayOfMonth = getFirstDayOfMonth(year, month);

    // Ajuste para que la semana comience en lunes (0 = lunes, 6 = domingo)
    const adjustedFirstDay = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;

    const days = [];

    // Días del mes anterior
    for (let i = 0; i < adjustedFirstDay; i++) {
      days.push(null);
    }

    // Días del mes actual
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }

    return days;
  };

  // Verifica si una fecha es la fecha de hoy
  const isToday = (day: number) => {
    if (!day) return false;

    const today = new Date();
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);

    return (
      today.getDate() === date.getDate() &&
      today.getMonth() === date.getMonth() &&
      today.getFullYear() === date.getFullYear()
    );
  };

  // Verifica si una fecha está dentro del rango seleccionado
  const isInRange = (day: number) => {
    if (!localStartDate || !day) return false;

    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    const startDate = localStartDate ? new Date(localStartDate) : null;
    const endDate = localEndDate ? new Date(localEndDate) : null;

    if (startDate && !endDate && hoveredDate) {
      return (
        (date >= startDate && date <= hoveredDate) || (date <= startDate && date >= hoveredDate)
      );
    }

    return startDate && endDate ? date >= startDate && date <= endDate : false;
  };

  // Verifica si un día es el inicio del rango
  const isRangeStart = (day: number) => {
    if (!day) return false;

    const date = formatDateString(new Date(currentDate.getFullYear(), currentDate.getMonth(), day));
    return date === localStartDate;
  };

  // Verifica si un día es el fin del rango
  const isRangeEnd = (day: number) => {
    if (!day) return false;

    const date = formatDateString(new Date(currentDate.getFullYear(), currentDate.getMonth(), day));
    return date === localEndDate;
  };

  // Maneja el hover sobre un día para mostrar el posible rango
  const handleDayHover = (day: number) => {
    if (localStartDate && !localEndDate && day) {
      setHoveredDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), day));
    }
  };

  // Nombres de los meses
  const monthNames = [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre',
  ];

  // Nombres cortos de los días de la semana
  const weekDayNames = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];

  // Renderiza el calendario
  const renderCalendar = () => {
    const days = generateCalendarDays();

    return (
      <div className={styles.calendarView}>
        <div className={styles.calendarHeader}>
          <button className={styles.navButton} onClick={goToPreviousMonth} type='button'>
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>
          <div className={styles.currentMonthYear}>
            <span className={styles.monthLabel} onClick={() => setViewMode('month')}>
              {monthNames[currentDate.getMonth()]}
            </span>
            <span className={styles.yearLabel} onClick={() => setViewMode('year')}>
              {currentDate.getFullYear()}
            </span>
          </div>
          <button className={styles.navButton} onClick={goToNextMonth} type='button'>
            <FontAwesomeIcon icon={faChevronRight} />
          </button>
        </div>

        <div className={styles.weekDays}>
          {weekDayNames.map((day) => (
            <div key={day} className={styles.weekDay}>
              {day}
            </div>
          ))}
        </div>

        <div className={styles.calendarDays}>
          {days.map((day, index) => (
            <div
              key={index}
              className={clsx(
                styles.calendarDay,
                day && styles.active,
                day && isToday(day) && styles.today,
                day && isInRange(day) && styles.inRange,
                day && isRangeStart(day) && styles.rangeStart,
                day && isRangeEnd(day) && styles.rangeEnd,
              )}
              onClick={() => day && handleDateClick(day)}
              onMouseEnter={() => handleDayHover(day || 0)}
              onMouseLeave={() => !localEndDate && setHoveredDate(null)}
            >
              {day}
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Renderiza el selector de meses
  const renderMonthSelector = () => {
    return (
      <div className={styles.monthSelector}>
        <div className={styles.selectorHeader}>
          <span>Seleccionar mes</span>
        </div>
        <div className={styles.monthsGrid}>
          {monthNames.map((month, index) => (
            <div
              key={month}
              className={clsx(
                styles.monthOption,
                currentDate.getMonth() === index && styles.selected,
              )}
              onClick={() => handleMonthSelect(index)}
            >
              {month}
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Renderiza el selector de años
  const renderYearSelector = () => {
    const currentYear = currentDate.getFullYear();
    const startYear = currentYear - 6;
    const years = Array.from({ length: 12 }, (_, i) => startYear + i);

    return (
      <div className={styles.yearSelector}>
        <div className={styles.selectorHeader}>
          <span>Seleccionar año</span>
        </div>
        <div className={styles.yearsGrid}>
          {years.map((year) => (
            <div
              key={year}
              className={clsx(styles.yearOption, currentYear === year && styles.selected)}
              onClick={() => handleYearSelect(year)}
            >
              {year}
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Renderiza la vista actual según el modo
  const renderView = () => {
    switch (viewMode) {
      case 'month':
        return renderMonthSelector();
      case 'year':
        return renderYearSelector();
      case 'calendar':
      default:
        return renderCalendar();
    }
  };

  return (
    <div className={styles.dateSelector}>
      {props.label && <label className={styles.dateInputLabel}>{props.label}</label>}
      <div className={clsx(styles.selectorContainer, isOpen && styles.open)} ref={dropdownRef}>
        <button className={styles.selectorButton} onClick={() => setIsOpen(!isOpen)} type='button'>
          <div className={styles.buttonContent}>
            <FontAwesomeIcon icon={faCalendar} className={styles.icon} />
            <span>{formatDisplayDate()}</span>
          </div>
          <FontAwesomeIcon icon={faChevronDown} />
        </button>
        <div className={styles.dropdown}>
          {renderView()}
          <div className={styles.selectedDates}>
            <div className={styles.dateDisplay}>
              <label>Inicio:</label>
              <span>{localStartDate ? new Date(localStartDate).toLocaleDateString() : '-'}</span>
            </div>
            <div className={styles.dateDisplay}>
              <label>Fin:</label>
              <span>{localEndDate ? new Date(localEndDate).toLocaleDateString() : '-'}</span>
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
