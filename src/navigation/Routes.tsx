import { BrowserRouter, Route, Routes as Router } from 'react-router';

import AuthPage from '@pages/AuthPage';
import HomePage from '@pages/HomePage';

const Routes = () => {
  return (
    <BrowserRouter>
      <Router>
        <Route path='/' element={<HomePage />} />
        <Route path='/auth' element={<AuthPage />} />
      </Router>
    </BrowserRouter>
  );
};

export default Routes;
