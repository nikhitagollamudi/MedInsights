import React, { useContext } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Header } from '../components/Header';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { useThemeContext } from '../contexts/ThemeContext';

const MainLayout: React.FC = () => {
    const { currentTheme, toggleTheme } = useThemeContext();
    const location = useLocation();

    return (
        <>
            <CssBaseline />
            {
                location.pathname.includes('app') ?
                <ThemeProvider theme={currentTheme}>
                    <Header />
                    <Outlet />
                </ThemeProvider> :
                <>
                    <Header />
                    <Outlet />
                </>
            }
        </>
    );
}

export default MainLayout;
