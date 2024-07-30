// import React from 'react';
import {
  Outlet,
  RouterProvider,
  ScrollRestoration,
  createBrowserRouter,
} from 'react-router-dom';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import ToasterProvider from './components/ToasterProvider';
import Menu from './components/menu/Menu';
import Activities from './pages/Activities/Activities';
import Login from './pages/Auth/Login';
import Error from './pages/Error';
import ProtectPage from './pages/ProtectLayout';
import EditProfile from './pages/User/EditProfile';
import Profile from './pages/User/Profile';

import CreateActivities from './pages/Activities/Create';
import DeatailActivities from './pages/Activities/Detail';
import Education from './pages/Education/Education';
import EducationDetail from './pages/Education/EducationDetail';

function App() {


  const Layout = () => {
    return (
      <div
        id="rootContainer"
        className="w-full p-0 m-0 overflow-visible min-h-screen flex flex-col justify-between"
      >
       
        <ToasterProvider />
        <ScrollRestoration />
        <div>
          <Navbar />
          <div className="w-full flex gap-0 pt-20 xl:pt-[96px] 2xl:pt-[112px] mb-auto">
            <div className="hidden xl:block xl:w-[250px] 2xl:w-[280px] 3xl:w-[350px] border-r-2 border-base-300 dark:border-slate-700 px-3 xl:px-4 xl:py-1">
              <Menu />
            </div>
            <div className="w-full px-4 xl:px-4 2xl:px-5 xl:py-2 overflow-clip">
              <Outlet />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  };

  const router = createBrowserRouter([
    {
      path: '/',
      element: <ProtectPage />,
      children: [{
        element: <Layout />,
        children: [

          {
            index: true,
            path: '/',
            element: <Profile />,
          },
          {
            path: ':id',
            element: <EditProfile />,
          },
          // {
          //   path: '/users',
          //   element: <Users />,
          // },

          {
           
            path: '/activities',
            element: <Activities />,
            children: [
              {
                path:'create',
                element: <CreateActivities/>
              },
              {
                path:':id',
                element: <DeatailActivities/>
              },
            ],
          },

          {
            path: '/education',
            element: <Education />,
            children: [{
              path: ':id',
              element: <EducationDetail/>
            }]
          },

          // {
          //   path: '/orders',
          //   element: <Orders />,
          // },
          // {
          //   path: '/posts',
          //   element: <Posts />,
          // },
          // {
          //   path: '/notes',
          //   element: <Notes />,
          // },
          // {
          //   path: '/calendar',
          //   element: <Calendar />,
          // },
          // {
          //   path: '/charts',
          //   element: <Charts />,
          // },
          // {
          //   path: '/logs',
          //   element: <Logs />,
          // },
        ]
      }],

      errorElement: <Error />,
    },

    {
      path: '/login',
      element: <Login />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
