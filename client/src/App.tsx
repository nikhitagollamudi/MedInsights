import { RouterProvider } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider as ThemeCtxProvider } from './contexts/ThemeContext';
import router from './router';

function App() {

  return (
    <AuthProvider>
      <ThemeCtxProvider>
        <RouterProvider router={router} />
      </ThemeCtxProvider>
    </AuthProvider>
  );
}

export default App;

