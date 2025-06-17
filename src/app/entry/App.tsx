import { RouterProvider } from 'react-router';
import '../styles/styles.css';
import { router } from '../router/router';

function App() {
  return <RouterProvider router={router} />;
}

export default App;
