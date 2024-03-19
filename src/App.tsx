import { BrowserRouter } from 'react-router-dom';
import Routes from '@/routes/index';
import Header from '@/components/Header';
import NoRenderOnPath from '@/utils/NoRenderOnPath.tsx';

function App() {
  return (
    <BrowserRouter>
      <NoRenderOnPath noRenderPaths={['/', '/notfound']}>
        <Header />
      </NoRenderOnPath>
      <Routes />
    </BrowserRouter>
  )
}

export default App;
