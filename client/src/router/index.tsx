import { createBrowserRouter } from "react-router-dom";
import { ActionFunction, ShouldRevalidateFunction } from "react-router-dom";
import LandingPage from "../pages/Landing/LandingPage";
import Login from "../pages/Auth/Login";
import DashboardLayout from "../pages/DashboardLayout/DashboardLayout";
import MainLayout from "../layouts/MainLayout";
import AuthLayout from "../pages/Auth/AuthLayout";
import Register from "../pages/Auth/Register";
import TwoFactorAuth from "../components/common/TwoFactorAuth";
import DashboardHome from "../pages/DashboardHome/DashboardHome";
import Settings from "../pages/Settings/Settings";
import Doctors from "../pages/Doctors/Doctors";

interface createBrowserRouter {
    routes: RouteObject[],
    opts?: {
      basename?: string;
      window?: Window;
    }
}

interface RouteObject {
    path?: string;
    index?: boolean;
    children?: React.ReactNode;
    caseSensitive?: boolean;
    id?: string;
    loader?: any;
    action?: ActionFunction;
    element?: React.ReactNode | null;
    Component?: React.ComponentType | null;
    errorElement?: React.ReactNode | null;
    ErrorBoundary?: React.ComponentType | null;
    shouldRevalidate?: ShouldRevalidateFunction;
}

const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
        children: [
            {
                index: true,
                element: <LandingPage />
            },
            {
                path: '/auth',
                element: <AuthLayout />,
                children: [
                    {
                        path: 'login',
                        element: <Login />
                    },
                    {
                        path: 'register',
                        element: <Register />
                    },
                    {
                        path: '2fa',
                        element: <TwoFactorAuth />
                    }
                ]
            },
            {
                path: '/app',
                element: <DashboardLayout />,
                children: [
                    {
                        index: true,
                        element: <DashboardHome />
                    },
                    {
                        path: 'appointments',
                        element: ''
                    },
                    {
                        path: 'doctors',
                        element: <Doctors />
                    },
                    {
                        path: 'insurances',
                        element: ''
                    },
                    {
                        path: 'patients',
                        element: ''
                    },
                    {
                        path: 'plans',
                        element: ''
                    },
                    {
                        path: 'settings',
                        element: <Settings />,
                    }
                ]
            }
        ]
    }
]);

export default router;