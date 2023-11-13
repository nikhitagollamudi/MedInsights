import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider as ThemeCtxProvider } from './contexts/ThemeContext';
import LandingPage from "./pages/Landing/LandingPage";

function App() {
  return (
    <Router>
      <AuthProvider>
        <ThemeCtxProvider>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            
          </Routes>
        </ThemeCtxProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
