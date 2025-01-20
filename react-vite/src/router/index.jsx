import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import Layout from './Layout';
import InitialLandingPage from '../components/InitialLandingPage';
import HomePage from '../components/HomePage'
import { PublicRoute, ProtectedRoute } from '../components/auth';
import DailyEntriesPage from '../components/DailyEntriesPage';
import ProfilePage from '../components/ProfilePAge';
export const router = createBrowserRouter([
  {
    path: "/",
    element: <PublicRoute component={InitialLandingPage} />,
},
  {
    element: <Layout />,
    children: [
        {
            path: "/home",
            element: <HomePage />,
        },
        {
            path: "/entries",
            element: <DailyEntriesPage />,
        },
        {
            path: "/stats",
            element: <div>Stats Page</div>,
        },
        {
          path: "/profile",
          element: <ProfilePage />,
      }
    ],
},
{
  element: <ProtectedRoute />,
  children: [
      {
          path: "/home",
          element: <Layout />,
          children: [
              {
                  index: true,
                  element: <HomePage />,
              },
              {
                  path: "entries",
                  element: <div>Daily Entries Page</div>,
              },
              {
                  path: "stats",
                  element: <div>Stats Page</div>,
              }
          ]
      }
  ]
},
  {
    element: <Layout />,
    children: [
      {
        path: "login",
        element: <LoginFormPage />,
      },
      {
        path: "signup",
        element: <SignupFormPage />,
      },
      
    ],
  },
]);