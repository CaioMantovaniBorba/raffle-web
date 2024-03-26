import { Routes as Router, Route } from 'react-router-dom';

import Login from '@/pages/Login';
import Dashboard from '@/pages/Dashboard';
import Users from '@/pages/Users';
import CreateRaffle from '@/pages/CreateRaffle';
import ListRaffle from '@/pages/ListRaffle';
import Checkout from '@/pages/Checkout';

const Routes: React.FC = () => (
  <Router>
    <Route path="/" Component={Login} />
    <Route path="/dashboard" Component={Dashboard} />
    <Route path="/users" Component={Users} />
    <Route path="/createRaffle" Component={CreateRaffle} />
    <Route path="/listRaffle" Component={ListRaffle} />
    <Route path="/checkout" Component={Checkout} />
  </Router>
);

export default Routes;