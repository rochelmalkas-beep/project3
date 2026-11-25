import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { UserProvider } from './context/UserContext.jsx';
import { DataProvider } from './context/DataContext.jsx';
import App from './App';
import './css/variables.css';
import './css/global.css';
import './css/common.css';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <UserProvider>
      <DataProvider>
        <App />
      </DataProvider>
    </UserProvider>
  </BrowserRouter>
);
