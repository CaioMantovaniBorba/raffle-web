import { Routes as Router, Route } from 'react-router-dom';

import Login from '@/pages/Login';
import Dashboard from '@/pages/Dashboard';

const Routes: React.FC = () => (
  <Router>
    <Route path="/" Component={Login} />
    <Route path="/dashboard" Component={Dashboard} />
  </Router>
);

export default Routes;