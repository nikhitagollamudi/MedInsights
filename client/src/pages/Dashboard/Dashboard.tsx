import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { useThemeContext } from '../../contexts/ThemeContext';
import CssBaseline from '@mui/material/CssBaseline';

const DashboardContent: React.FC = () => {
    const { currentTheme, toggleTheme } = useThemeContext();

    return (
        <ThemeProvider theme={currentTheme}>
        <CssBaseline />
        <button onClick={toggleTheme}>
            Toggle Theme
        </button>
        <div>Your dashboard content or <code>&lt;router-view&gt;</code></div>
        </ThemeProvider>
    );
}

export default DashboardContent;
