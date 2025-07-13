// src/models/MonitoringData.ts
import { DeviceMonitoring } from '../store/types/ApiTypes';

export interface MonitoringData {
  id: string;
  fecha: string; // Date
  dispositivo: string; // Device
  critico: boolean; // Critical
  ubicacion: string; // Location
  estado: string; // Status
  imagen: string; // Image URL
  plano: string; // Floor plan
  uptime: string; // Uptime
  timestamp: string; // For filtering by date
}

// Format date for display (DD/MM/YYYY HH:MM)
const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');

  return `${day}/${month}/${year} ${hours}:${minutes}`;
};

export function convertDeviceMonitoringToMonitoringData(dto: DeviceMonitoring): MonitoringData {
  return {
    id: dto.id,
    fecha: formatDate(dto.timestamp),
    dispositivo: `Device-${dto.deviceId}`,
    critico: false, // This needs to be enriched from the Device object
    ubicacion: 'Unknown Location', // This needs to be enriched from the Place object
    estado: 'Unknown Status', // This needs to be enriched from the DeviceStatus object
    imagen: `https://device-monitor-image-${Math.floor(Math.random() * 1000)}.jpg`,
    plano: 'Unknown Floor Plan',
    uptime: 'N/A',
    timestamp: dto.timestamp,
  };
}
