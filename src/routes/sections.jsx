import { lazy, Suspense, useEffect, useState } from 'react';
import { Outlet, Navigate, useRoutes, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectAuth, login } from 'src/redux/authSlice';

import DashboardLayout from 'src/layouts/dashboard';
import PrivateRoute from './private-route';
import RegisterPage from 'src/pages/register';

// Lazy load pages
export const IndexPage = lazy(() => import('src/pages/app'));
export const UserPage = lazy(() => import('src/pages/user'));
export const AdminPage = lazy(() => import('src/sections/overview/user/view/user-view'));
export const LoginPage = lazy(() => import('src/pages/login'));
export const Page404 = lazy(() => import('src/pages/page-not-found'));
export const DocumentationPage = lazy(() => import('src/pages/documentation-view')); // Import the documentation page

export default function Router() {
  const { isAuthenticated } = useSelector(selectAuth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('logged'); // Get token from localStorage

    if (token) {
      dispatch(login(token)); // Dispatch login action if token exists
      if (token === 'ad001') {
        navigate('/admin'); // Navigate to admin page if token is 'ad001'
      }
    }

    setIsLoading(false);
  }, [dispatch, navigate]);

  const routes = useRoutes([
    {
      element: (
        <DashboardLayout>
          <Suspense fallback={<div>Loading...</div>}>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      ),
      children: [
        {
          element: <PrivateRoute />,
          children: [
            { path: '/', element: <IndexPage />, index: true },
            { path: 'user', element: <UserPage /> },
          ],
        },
        {
          path: 'admin',
          element: <AdminPage />,
        },
        {
          path: 'documentation', // Add the documentation route
          element: <DocumentationPage />,
        },
      ],
    },
    {
      path: 'login',
      element: isLoading ? null : isAuthenticated ? <Navigate to="/" replace /> : <LoginPage />,
    },
    {
      path: 'register',
      element: <RegisterPage />,
    },
    {
      path: '404',
      element: <Page404 />,
    },
    {
      path: '*',
      element: <Navigate to="/login" replace />,
    },
  ]);

  return routes;
}
