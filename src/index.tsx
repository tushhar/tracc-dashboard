import React from 'react';
import ReactDOM from 'react-dom/client';
import './globals.css';
import App from './App'; // TypeScript will automatically resolve this to App.tsx

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);