import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { Theme } from '@mui/material/styles';
import theme1 from '../themes/default';
import theme2 from '../themes/theme1';
import AuthContext from './AuthContext';
import { Helper } from '../services/helper';

interface ThemeProviderProps {
    children: ReactNode;
}

type ThemeContextType = {
  currentTheme: Theme;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const auth = useContext(AuthContext);
  const [theme, setTheme] = useState(theme1);

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === theme1 ? theme2 : theme1));
  };

  useEffect(() => {
    if (auth?.authState?.user?.theme) {
      const newTheme = Helper.getTheme(auth?.authState?.user?.theme)
      setTheme(newTheme);
    }
  }, [auth])

  return (
    <ThemeContext.Provider value={{ currentTheme: theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useThemeContext must be used within a ThemeProvider");
  }
  return context;
};
