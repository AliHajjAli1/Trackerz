import './index.css'
import AppRoutes from './routes.tsx'
import { RouterProvider } from 'react-router-dom'
import React from 'react';
import ReactDOM from 'react-dom/client';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <RouterProvider router={AppRoutes}/>
  </React.StrictMode>
);
