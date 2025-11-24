// client/src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css'; // Our Tailwind styles
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.jsx'; // Import our provider
import "@fontsource/lora";
import "@fontsource/playfair-display";
import "@fontsource/patrick-hand";


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* We wrap the app in:
      1. BrowserRouter - to handle routing
      2. AuthProvider - to give everything access to user info
    */}
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);