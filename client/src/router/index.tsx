import { createBrowserRouter } from "react-router-dom";
import { LoaderFunction, ActionFunction, ShouldRevalidateFunction, redirect } from "react-router-dom";
import LandingPage from "../pages/Landing/LandingPage";
import Login from "../pages/Auth/Login";
import withProtectedRoute from "../hoc/ProtectedRoute";
import DashboardLayout from "../pages/DashboardLayout/DashboardLayout";
import MainLayout from "../layouts/MainLayout";
import AuthContext from "../contexts/AuthContext";
import { useContext } from "react";


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

const getProtectedRoute = (component:React.ComponentType) => {
    const ProtectedRoute = withProtectedRoute(component);
    return <ProtectedRoute />;
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
                path: '/login',
                element: <Login />
            },
            {
                path: '/register',
                element: <LandingPage />
            },
            {
                path: '/app',
                element: getProtectedRoute(DashboardLayout),
                children: [

                ]
            }
        ]
    }
]);

export default router;