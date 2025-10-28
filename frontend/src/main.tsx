// frontend/src/main.tsx (top of file)
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css'; // <-- THIS MUST EXIST and point to the file above

const container = document.getElementById('root')!;
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
