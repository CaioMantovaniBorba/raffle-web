import { Routes as Router, Route } from 'react-router-dom';

import Login from '@/pages/Login';

const Routes: React.FC = () => (
  <Router>
    <Route path="/" Component={Login} />
  </Router>
);

export default Routes;