import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.tsx';
import { AuthProvider } from './components/AuthProvider.tsx';
import ProtectedRoute from './components/ProtectedRoute.tsx';
import './index.css';
import ProtectedPage from './pages/ProtectedPage.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/protected',
    element: (
      <ProtectedRoute>
        <ProtectedPage />
      </ProtectedRoute>
    ),
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);
