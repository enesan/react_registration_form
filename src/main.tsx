import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import {MantineProvider} from "@mantine/core";
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import {CodeConfirmationForm} from "./Components/CodeConfirmationForm";
import {RegistrationForm} from "./Components/RegistrationForm";
import {AuthenticationForm} from "./Components/AuthenticationForm";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />
    },
    {
        path: "/registration/confirm",
        element: <CodeConfirmationForm />,
    },
    {
        path: "/registration",
        element: <RegistrationForm />,
    },
    {
        path: "/auth",
        element: <AuthenticationForm />,
        index: true
    },


]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <MantineProvider>
    <RouterProvider router={router} />
      </MantineProvider>

  </React.StrictMode>,
)
