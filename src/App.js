
import React from 'react';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import Dashboard from './Components/Dashboard';
import AuthGuard from './Auth/index';
import SignUp from './Components/SignUp';
import Login from './Components/Login';
import Header from './Components/Header';
function App() {

  const router = createBrowserRouter([
    { path: '/signup', element: <SignUp /> },
    { path: '/login', element: <Login /> },
    {
      path: '/dashboard', element: (
        <AuthGuard>
          <Header />
          <Dashboard />
        </AuthGuard>
      )
    },
    { path: '/*', element: <Navigate to="/dashboard" replace /> },
  ])

  // function PrivateRoute({ children }) {
  //   // const isAuthenticated = checkUserAuthentication();
  //   const isAuthenticated = true;
  //   return isAuthenticated ? children : <Navigate to="/login" />;
  // }

  return (
    <div className="App">

      <RouterProvider router={router} />
    </div>
  );
}

export default App;
