import { BrowserRouter, Route, Routes as Router } from 'react-router';

import HomePage from '/@application/pages/HomePage';

const Routes = () => {
  return (
    <BrowserRouter>
      <Router>
        <Route path='/' element={<HomePage />} />
      </Router>
    </BrowserRouter>
  );
};

export default Routes;
