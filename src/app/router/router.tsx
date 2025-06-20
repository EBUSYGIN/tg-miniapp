import { createBrowserRouter } from 'react-router';
import { LayoutProvider } from '../Providers/LayoutProvider/LayoutProvider';
import { Main, Register } from '../../pages';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <LayoutProvider />,
    children: [
      {
        path: '/register',
        element: <Register />,
      },
      {
        path: '/main',
        element: <Main />,
      },
    ],
  },
]);
