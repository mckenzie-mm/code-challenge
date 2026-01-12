import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'
import Routes from './pages';
import { SocketProvider } from './context/SocketContext';
import { ListProvider } from './context/ListContext';
import { MyNameProvider } from './context/MyNameContext';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
     <SocketProvider>
      <ListProvider>
        <MyNameProvider>
            <Routes />     
        </MyNameProvider>
      </ListProvider>
    </SocketProvider>
  </StrictMode>
);
