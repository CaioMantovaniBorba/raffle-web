import { Routes as Router, Route } from 'react-router-dom';

import Login from '@/pages/Login';
import Dashboard from '@/pages/Dashboard';
import Users from '@/pages/Users';

const Routes: React.FC = () => (
  <Router>
    <Route path="/" Component={Login} />
    <Route path="/dashboard" Component={Dashboard} />
    <Route path="/users" Component={Users} />
  </Router>
);

export default Routes;