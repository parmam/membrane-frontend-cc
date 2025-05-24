import { useCallback, useEffect, useRef, useState } from 'react';

import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';

import { DEFAULT_TABLE_CONFIG } from '../../elements/Table/config';
import { DeviceData, dummyDeviceData } from '../LastStatusTable/data';
import styles from './LastStatusCards.module.css';

// Extender el tipo Window para permitir el timeout
declare global {
  interface Window {
    scrollTimeout?: number;
    lastScrollTop?: number;
    debounceTimer?: ReturnType<typeof setTimeout>;
    resizeTimer?: ReturnType<typeof setTimeout>;
  }
}

// Función para debounce
const debounce = <T extends (...args: unknown[]) => void>(
  fn: T,
  delay: number,
): ((...args: Parameters<T>) => void) => {
  return (...args: Parameters<T>) => {
    if (window.debounceTimer) {
      clearTimeout(window.debounceTimer);
    }
    window.debounceTimer = setTimeout(() => {
      fn(...args);
    }, delay);
  };
};

// Componente para la vista de tarjeta en móviles
const DeviceCard = ({ device }: { device: DeviceData }) => {
  return (
    <div className={clsx(styles.deviceCard, device.critico && styles.criticalCard)}>
      <div className={styles.cardHeader}>
        <h3 className={styles.cardTitle}>{device.dispositivo}</h3>
        {device.critico && (
          <FontAwesomeIcon icon={faCircleExclamation} className={styles.criticalIcon} />
        )}
      </div>

      <div className={styles.cardStatus}>
        <span
          className={clsx(
            styles.statusIndicator,
            styles[`status${device.ultimoEstado.replace(/\s+/g, '')}`],
          )}
        >
          {device.ultimoEstado}
        </span>
      </div>

      <div className={styles.cardDetails}>
        <div className={styles.cardDetail}>
          <span className={styles.cardDetailLabel}>Tipo</span>
          <span className={styles.cardDetailValue}>{device.tipo}</span>
        </div>
        <div className={styles.cardDetail}>
          <span className={styles.cardDetailLabel}>Marca</span>
          <span className={styles.cardDetailValue}>{device.marca}</span>
        </div>
        <div className={styles.cardDetail}>
          <span className={styles.cardDetailLabel}>Sitio</span>
          <span className={styles.cardDetailValue}>{device.sitio}</span>
        </div>
        <div className={styles.cardDetail}>
          <span className={styles.cardDetailLabel}>FCO</span>
          <span className={styles.cardDetailValue}>{device.fco}</span>
        </div>
      </div>
    </div>
  );
};

interface LastStatusCardsProps {
  data?: DeviceData[];
  className?: string;
}

const LastStatusCards = ({ data = dummyDeviceData, className }: LastStatusCardsProps) => {
  // Cantidad inicial de elementos a mostrar
  const initialVisibleCount = DEFAULT_TABLE_CONFIG.itemsPerPage * 2;
  const [displayCount, setDisplayCount] = useState(initialVisibleCount);
  const [loading, setLoading] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isNearBottom, setIsNearBottom] = useState(false);
  const isLoadingRef = useRef(false); // Referencia para evitar cargas simultáneas

  // Inicializamos contador de scroll
  if (typeof window !== 'undefined' && window.lastScrollTop === undefined) {
    window.lastScrollTop = 0;
  }

  // Función para cargar más elementos cuando se hace scroll hacia abajo
  const loadMoreItems = useCallback(() => {
    // Prevenir cargas múltiples usando ref en lugar de state
    if (isLoadingRef.current) {
      return;
    }

    const shouldLoad = displayCount < data.length;
    if (!shouldLoad) return;

    // Marcar como cargando
    isLoadingRef.current = true;
    setLoading(true);

    // Simulamos una carga asíncrona
    setTimeout(() => {
      setDisplayCount((prevCount) => {
        const newCount = prevCount + initialVisibleCount;
        return Math.min(newCount, data.length);
      });

      // Finalizar carga
      setLoading(false);
      isLoadingRef.current = false;
    }, 300);
  }, [data.length, displayCount, initialVisibleCount]);

  // Verificar si estamos cerca del final del scroll
  const checkIfNearBottom = useCallback(() => {
    if (!containerRef.current) return;

    const { scrollTop, scrollHeight, clientHeight } = containerRef.current;

    // Determinar dirección de scroll
    const lastScrollTop = window.lastScrollTop ?? 0;
    const direction =
      scrollTop > lastScrollTop ? 'down' : scrollTop < lastScrollTop ? 'up' : 'none';

    // Actualizar último scrollTop
    window.lastScrollTop = scrollTop;

    // Usar el valor configurado para el umbral de scroll
    const threshold = DEFAULT_TABLE_CONFIG.scrollThreshold;
    const distanceFromBottom = scrollHeight - scrollTop - clientHeight;

    // Si estamos a menos del umbral del final, consideramos que estamos cerca del final
    const nearBottom = distanceFromBottom < threshold;

    // Solo actualizamos el estado si cambia para evitar renderizados innecesarios
    if (nearBottom !== isNearBottom) {
      setIsNearBottom(nearBottom);

      // Si estamos cerca del final y hay más elementos por cargar, los cargamos
      // Pero solo si el usuario está desplazándose hacia abajo
      if (
        nearBottom &&
        direction === 'down' &&
        !isLoadingRef.current &&
        displayCount < data.length
      ) {
        loadMoreItems();
      }
    }
  }, [data.length, displayCount, isNearBottom, loadMoreItems]);

  // Versión con debounce del checkIfNearBottom
  const debouncedCheckIfNearBottom = useCallback(
    debounce(() => {
      checkIfNearBottom();
    }, 150), // 150ms de debounce para evitar múltiples llamadas
    [checkIfNearBottom],
  );

  // Manejar eventos de scroll
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Implementación directa del evento de scroll
    const handleScroll = () => {
      // Usamos el método con debounce
      debouncedCheckIfNearBottom();
    };

    // Registrar el evento de scroll directamente
    container.addEventListener('scroll', handleScroll, { passive: true });

    // Limpieza
    return () => {
      container.removeEventListener('scroll', handleScroll);

      // Limpiar el debounce timer si existe
      if (window.debounceTimer) {
        clearTimeout(window.debounceTimer);
      }
    };
  }, [debouncedCheckIfNearBottom]);

  // Elementos que serán mostrados según el scroll
  const visibleData = data.slice(0, displayCount);
  const hasMore = displayCount < data.length;

  return (
    <div
      ref={containerRef}
      className={clsx(styles.mobileContainer, className)}
      style={{
        height: `${DEFAULT_TABLE_CONFIG.tableHeight}px`,
        maxHeight: `${DEFAULT_TABLE_CONFIG.tableHeight}px`,
        overflowY: 'auto',
        overflowX: 'hidden',
      }}
      onScroll={() => debouncedCheckIfNearBottom()}
    >
      <div className={styles.cardContainer}>
        <div className={styles.mobileHeader}>
          <span className={styles.mobileCount}>
            {visibleData.length} de {data.length} dispositivos
          </span>
        </div>

        {visibleData.map((device) => (
          <DeviceCard key={device.id} device={device} />
        ))}

        {loading && (
          <div className={styles.loadingCardContainer}>
            <div className={styles.loadingIndicator}>Cargando más dispositivos...</div>
          </div>
        )}

        {hasMore && !loading && (
          <div className={styles.scrollHint}>Desplázate hacia abajo para cargar más</div>
        )}
      </div>
    </div>
  );
};

export default LastStatusCards;
