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

// Device types
export const deviceTypes = [
  'Router',
  'Switch',
  'Firewall',
  'Access Point',
  'Server',
  'Gateway',
  'Controller',
  'Modem',
  'Repeater',
  'Load Balancer',
];

// Brands
export const brands = [
  'Cisco',
  'Juniper',
  'Arista',
  'HP',
  'Dell',
  'Fortinet',
  'Palo Alto',
  'Ubiquiti',
  'Aruba',
  'Huawei',
];

// Locations
export const locations = [
  'Datacenter A',
  'Datacenter B',
  'Office Madrid',
  'Office Barcelona',
  'Office Valencia',
  'Cloud East',
  'Cloud West',
  'Branch Office 1',
  'Branch Office 2',
  'Remote Site',
];

// Status options
export const statusOptions = [
  'Online',
  'Offline',
  'Warning',
  'Maintenance',
  'Degraded',
  'Restarting',
  'Overloaded',
];

// Floor plans
export const floorPlans = [
  'Floor 1',
  'Floor 2',
  'Floor 3',
  'Basement',
  'Main Hall',
  'East Wing',
  'West Wing',
  'North Wing',
  'South Wing',
  'External',
];

// Generate a random timestamp from the last 30 days
const generateTimestamp = () => {
  const now = new Date();
  const daysAgo = Math.floor(Math.random() * 30);
  const hoursAgo = Math.floor(Math.random() * 24);
  const minutesAgo = Math.floor(Math.random() * 60);

  const date = new Date(now);
  date.setDate(date.getDate() - daysAgo);
  date.setHours(date.getHours() - hoursAgo);
  date.setMinutes(date.getMinutes() - minutesAgo);

  return date.toISOString();
};

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

// Generate random uptime
const generateUptime = (): string => {
  const days = Math.floor(Math.random() * 365);
  const hours = Math.floor(Math.random() * 24);
  const minutes = Math.floor(Math.random() * 60);

  return `${days}d ${hours}h ${minutes}m`;
};

// Generate random image URL (simulated)
const generateImageUrl = (): string => {
  return `https://device-monitor-image-${Math.floor(Math.random() * 1000)}.jpg`;
};

// Generate dummy data
export const generateDummyData = (count = 15000): MonitoringData[] => {
  const data: MonitoringData[] = [];

  for (let i = 0; i < count; i++) {
    const timestamp = generateTimestamp();
    const status = statusOptions[Math.floor(Math.random() * statusOptions.length)];
    const isCritical = status === 'Offline' || Math.random() < 0.15; // 15% chance of being critical otherwise

    data.push({
      id: `monitor-${i + 1}`,
      timestamp,
      fecha: formatDate(timestamp),
      dispositivo: `Device-${1000 + i}`,
      critico: isCritical,
      ubicacion: locations[Math.floor(Math.random() * locations.length)],
      estado: status,
      imagen: generateImageUrl(),
      plano: floorPlans[Math.floor(Math.random() * floorPlans.length)],
      uptime: generateUptime(),
    });
  }

  return data;
};

// Export dummy data for immediate use
export const dummyMonitoringData = generateDummyData();
