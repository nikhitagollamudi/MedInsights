import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider as ThemeCtxProvider } from './contexts/ThemeContext';
import withProtectedRoute from './hoc/ProtectedRoute'
import LandingPage from './pages/Landing/LandingPage';
import DashboardContent from './pages/Dashboard/Dashboard';

function App() {

  const ProtectedRoute = withProtectedRoute(DashboardContent);

  return (
    <AuthProvider>
      <ThemeCtxProvider>
        <Router>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/dashboard" element={<ProtectedRoute />} />
          </Routes>
        </Router>
      </ThemeCtxProvider>
    </AuthProvider>
  );
}

export default App;
