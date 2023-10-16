import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { useThemeContext } from '../../contexts/ThemeContext';
import { Button } from '@mui/material';

const DashboardLayout: React.FC = () => {
    const { currentTheme, toggleTheme } = useThemeContext();


    return (
        <ThemeProvider theme={currentTheme}>
            <Button variant="outlined" onClick={toggleTheme}>
                Toggle Theme
            </Button>
            <div>Your dashboard content</div>
        </ThemeProvider>
    );
}

export default DashboardLayout;
