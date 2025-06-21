import { createBrowserRouter, Navigate } from 'react-router';
import { LayoutProvider } from '../Providers/LayoutProvider/LayoutProvider';
import { Admin, CreateTask, Main, Register } from '../../pages';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <LayoutProvider />,
    children: [
      {
        index: true,
        element: <Navigate to='/register' replace />,
      },
      {
        path: '/register',
        element: <Register />,
      },
      {
        path: '/main',
        element: <Main />,
      },
      {
        path: '/admin',
        element: <Admin />,
      },
      {
        path: '/add-task',
        element: <CreateTask />,
      },
    ],
  },
]);
