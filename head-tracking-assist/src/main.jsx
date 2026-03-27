import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
  console.log('VirtClass: Frontend Mounted Successfully');
} else {
  console.error('CRITICAL: Root container not found!');
  document.body.innerHTML = '<h1 style="color:red; text-align:center; margin-top:50px">ERROR: Could not find "root" element in index.html</h1>';
}
