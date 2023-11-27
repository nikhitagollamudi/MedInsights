// App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider as ThemeCtxProvider } from './contexts/ThemeContext';
import LandingPage from "./pages/Landing/LandingPage";
import Messenger from "./pages/Message/Messenger";

const App: React.FC = () => (
  <Router>
    <AuthProvider>
      <ThemeCtxProvider>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/Message" element={<Messenger />} />
        </Routes>
      </ThemeCtxProvider>
    </AuthProvider>
  </Router>
);

export default App;

