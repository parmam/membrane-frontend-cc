import { FunctionComponent, useState } from 'react';

import Option from '../../elements/Option/Option';
import Select from '../../elements/Select/Select';
import { brands, deviceTypes, sites, statusOptions } from '../../prototypes/LastStatusTable/data';
import DateSelector from '../DateSelector/DateSelector';
import styles from './LatestStatesFilters.module.css';

interface LatestStatesFiltersProps {
  onFilterChange?: (filters: FilterState) => void;
}

interface FilterState {
  dispositivo: string;
  tipo: string;
  marca: string;
  sitio: string;
  ultimoEstado: string;
  critico: string;
  startDate: string | null;
  endDate: string | null;
}

const LatestStatesFilters: FunctionComponent<LatestStatesFiltersProps> = (props) => {
  const [filters, setFilters] = useState<FilterState>({
    dispositivo: '',
    tipo: '',
    marca: '',
    sitio: '',
    ultimoEstado: '',
    critico: '',
    startDate: null,
    endDate: null,
  });

  const handleFilterChange = <K extends keyof FilterState>(field: K, value: FilterState[K]) => {
    const newFilters = {
      ...filters,
      [field]: value,
    };

    setFilters(newFilters);

    if (props.onFilterChange) {
      props.onFilterChange(newFilters);
    }
  };

  const handleDateChange = (startDate: string | null, endDate: string | null) => {
    const newFilters = {
      ...filters,
      startDate,
      endDate,
    };

    setFilters(newFilters);

    if (props.onFilterChange) {
      props.onFilterChange(newFilters);
    }
  };

  const resetFilters = () => {
    const resetValues: FilterState = {
      dispositivo: '',
      tipo: '',
      marca: '',
      sitio: '',
      ultimoEstado: '',
      critico: '',
      startDate: null,
      endDate: null,
    };

    setFilters(resetValues);

    if (props.onFilterChange) {
      props.onFilterChange(resetValues);
    }
  };

  return (
    <div>
      <div className={styles.filtersHeader}>
        <h3 className={styles.filtersTitle}>Filtros</h3>
        <button className={styles.resetButton} onClick={resetFilters} type='button'>
          Restablecer filtros
        </button>
      </div>

      <div className={styles.filtersContainer}>
        {/* Primera fila de filtros */}
        <div className={styles.filtersRow}>
          <div className={styles.filterGroup}>
            <Select
              label='Dispositivo'
              value={filters.dispositivo}
              onChange={(value: string) => handleFilterChange('dispositivo', value)}
            >
              <Option value=''>Todos los dispositivos</Option>
              {/* En un caso real, esto podría ser una lista dinámica de dispositivos */}
              <Option value='Device-1000'>Device-1000</Option>
              <Option value='Device-1001'>Device-1001</Option>
              <Option value='Device-1002'>Device-1002</Option>
            </Select>
          </div>

          <div className={styles.filterGroup}>
            <Select
              label='Tipo'
              value={filters.tipo}
              onChange={(value: string) => handleFilterChange('tipo', value)}
            >
              <Option value=''>Todos los tipos</Option>
              {deviceTypes.map((type: string) => (
                <Option key={type} value={type}>
                  {type}
                </Option>
              ))}
            </Select>
          </div>

          <div className={styles.filterGroup}>
            <Select
              label='Marca'
              value={filters.marca}
              onChange={(value: string) => handleFilterChange('marca', value)}
            >
              <Option value=''>Todas las marcas</Option>
              {brands.map((brand: string) => (
                <Option key={brand} value={brand}>
                  {brand}
                </Option>
              ))}
            </Select>
          </div>

          <div className={styles.filterGroup}>
            <Select
              label='Sitio'
              value={filters.sitio}
              onChange={(value: string) => handleFilterChange('sitio', value)}
            >
              <Option value=''>Todos los sitios</Option>
              {sites.map((site: string) => (
                <Option key={site} value={site}>
                  {site}
                </Option>
              ))}
            </Select>
          </div>
        </div>

        {/* Segunda fila de filtros */}
        <div className={styles.filtersRow}>
          <div className={styles.filterGroup}>
            <Select
              label='Estado'
              value={filters.ultimoEstado}
              onChange={(value: string) => handleFilterChange('ultimoEstado', value)}
            >
              <Option value=''>Todos los estados</Option>
              {statusOptions.map((status: string) => (
                <Option key={status} value={status}>
                  {status}
                </Option>
              ))}
            </Select>
          </div>

          <div className={styles.filterGroup}>
            <Select
              label='Crítico'
              value={filters.critico}
              onChange={(value: string) => handleFilterChange('critico', value)}
            >
              <Option value=''>Todos</Option>
              <Option value='true'>Sí</Option>
              <Option value='false'>No</Option>
            </Select>
          </div>

          <div className={styles.filterGroup}>
            <DateSelector
              startDate={filters.startDate}
              endDate={filters.endDate}
              onDateChange={handleDateChange}
              label='Rango de fechas'
            />
          </div>

          {/* Espacio para equilibrar la distribución */}
          <div className={styles.filterGroup}></div>
        </div>
      </div>
    </div>
  );
};

export default LatestStatesFilters;
