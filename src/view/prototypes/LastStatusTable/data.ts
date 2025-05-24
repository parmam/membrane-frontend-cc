export interface DeviceData {
  id: string;
  dispositivo: string;
  tipo: string;
  marca: string;
  sitio: string;
  fco: string;
  ultimoEstado: string;
  critico: boolean;
  timestamp: string;
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

// Sites
export const sites = [
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

// Generate a random FCO (could be a serial number or other identifier)
const generateFCO = () => {
  const prefix = ['FCO', 'SN', 'ID', 'REF'];
  const randomPrefix = prefix[Math.floor(Math.random() * prefix.length)];
  const randomNumbers = Math.floor(Math.random() * 10000000)
    .toString()
    .padStart(7, '0');
  return `${randomPrefix}-${randomNumbers}`;
};

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

// Generate dummy data with 150 rows
export const generateDummyData = (count = 150): DeviceData[] => {
  const data: DeviceData[] = [];

  for (let i = 0; i < count; i++) {
    const status = statusOptions[Math.floor(Math.random() * statusOptions.length)];
    const isCritical = status === 'Offline' || Math.random() < 0.15; // 15% chance of being critical otherwise

    data.push({
      id: `device-${i + 1}`,
      dispositivo: `Device-${1000 + i}`,
      tipo: deviceTypes[Math.floor(Math.random() * deviceTypes.length)],
      marca: brands[Math.floor(Math.random() * brands.length)],
      sitio: sites[Math.floor(Math.random() * sites.length)],
      fco: generateFCO(),
      ultimoEstado: status,
      critico: isCritical,
      timestamp: generateTimestamp(),
    });
  }

  return data;
};

// Export dummy data for immediate use
export const dummyDeviceData = generateDummyData();
