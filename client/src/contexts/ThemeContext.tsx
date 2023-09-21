import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Theme } from '@mui/material/styles';
import defaultTheme from '../themes/default';
import theme1 from '../themes/theme1';

interface ThemeProviderProps {
    children: ReactNode;
}

type ThemeContextType = {
  currentTheme: Theme;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState(defaultTheme);

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === defaultTheme ? theme1 : defaultTheme));
  };

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
