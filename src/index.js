import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux'; // Importa el Provider
import { store } from './store/store.js'; // Asegúrate de que la ruta sea correcta
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}> {/* Envuelve tu aplicación con el Provider */}
      <App />
    </Provider>
  </React.StrictMode>
);

reportWebVitals();