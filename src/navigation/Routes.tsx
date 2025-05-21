import { BrowserRouter, Navigate, Route, Routes as Router } from 'react-router-dom';

import AuthPage from '@pages/AuthPage';
import BrandsPage from '@pages/BrandsPage';
import DashboardPage from '@pages/DashboardPage';
import DevicesPage from '@pages/DevicesPage';
import FirmwaresPage from '@pages/FirmwaresPage';
import GroupsPage from '@pages/GroupsPage';
import HomePage from '@pages/HomePage';
import LatestStatesPage from '@pages/LatestStatesPage';
import ModelsPage from '@pages/ModelsPage';
import MonitoringPage from '@pages/MonitoringPage';
import RolesPage from '@pages/RolesPage';
import SitesPage from '@pages/SitesPage';
import UsersPage from '@pages/UsersPage';
import MainLayout from '@view/layouts/MainLayout/MainLayout';

const Routes = () => {
  return (
    <BrowserRouter>
      <Router>
        {/* Rutas públicas */}
        <Route path='/auth' element={<AuthPage />} />

        {/* Rutas protegidas por layout */}
        <Route path='/' element={<MainLayout />}>
          <Route index element={<HomePage />} />

          {/* Spanish routes */}
          <Route path='dashboard' element={<DashboardPage />} />
          <Route path='monitoreo' element={<MonitoringPage />} />
          <Route path='ultimos-estados' element={<LatestStatesPage />} />

          {/* English routes */}
          <Route path='monitoring' element={<MonitoringPage />} />
          <Route path='latest-states' element={<LatestStatesPage />} />

          {/* Rutas de administración - Spanish */}
          <Route path='admin'>
            <Route path='usuarios' element={<UsersPage />} />
            <Route path='roles' element={<RolesPage />} />
            <Route path='sitios' element={<SitesPage />} />
            <Route path='grupos' element={<GroupsPage />} />
            <Route path='dispositivos' element={<DevicesPage />} />
            <Route path='marcas' element={<BrandsPage />} />
            <Route path='modelos' element={<ModelsPage />} />
            <Route path='firmwares' element={<FirmwaresPage />} />
          </Route>

          {/* Admin routes - English */}
          <Route path='admin'>
            <Route path='users' element={<UsersPage />} />
            <Route path='roles' element={<RolesPage />} />
            <Route path='sites' element={<SitesPage />} />
            <Route path='groups' element={<GroupsPage />} />
            <Route path='devices' element={<DevicesPage />} />
            <Route path='brands' element={<BrandsPage />} />
            <Route path='models' element={<ModelsPage />} />
            <Route path='firmwares' element={<FirmwaresPage />} />
          </Route>

          {/* Ruta para cualquier otra URL no definida */}
          <Route path='*' element={<Navigate to='/' replace />} />
        </Route>
      </Router>
    </BrowserRouter>
  );
};

export default Routes;
