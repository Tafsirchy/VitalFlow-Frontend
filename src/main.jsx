import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router';
import router from './Routes/Routes.jsx';
import AuthProvider from './Provider/AuthProvider.jsx';
import { ToastContainer } from 'react-toastify';

import SmoothScroll from './Components/Shared/SmoothScroll.jsx';

createRoot(document.getElementById("root")).render(
  // <StrictMode>
    <AuthProvider>
      <SmoothScroll>
        <RouterProvider router={router} />
      </SmoothScroll>
      <ToastContainer></ToastContainer>
    </AuthProvider>
  // </StrictMode>
);
