import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import reportWebVitals from './reportWebVitals';

// ASSETS ::

// COMPONENTS ::

// SERVICE ::

// STYLES ::
import "./styles/index.css";

// PAGES ::
import Home from './pages/Home';

// S:
import Register_LoginForm from './pages/s/Register&LoginForm';
import Profile from './pages/app/prisma/profile/profile';
import Chat from './pages/app/prisma/chat/Chat';

// APP:


const router = createBrowserRouter([
  {
    path: "/",
    element: <Home></Home>,
  },
  {
    path: "/profile/:username",
    element: <Profile />,
  },
  {
    path: "/chat/:username",
    element: <Chat />,
  },
  {
    path: "/Register&LoginForm",
    // eslint-disable-next-line react/jsx-pascal-case
    element: <Register_LoginForm></Register_LoginForm>,
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

reportWebVitals();
