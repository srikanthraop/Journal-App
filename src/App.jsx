import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Login from "./pages/Login";
import Error from "./pages/Error";
import AppLayout from "./pages/AppLayout";
import Welcome from "./pages/Welcome";
import Dashboard from "./pages/Dashboard";
import JournalEntryDetailed, {
    journalEntryDetailsLoader,
} from "./pages/JournalEntryDetailed";

const router = createBrowserRouter([
    {
        element: <AppLayout />,
        errorElement: <Error />,
        children: [
            {
                path: "/",
                element: <Welcome />,
            },

            {
                path: "/login",
                element: <Login />,
            },

            {
                path: "/dashboard",
                element: <Dashboard />,
            },
            {
                path: "/entry/:id",
                element: <JournalEntryDetailed />,
                loader: journalEntryDetailsLoader,
            },
        ],
    },
]);

const App = () => {
    return <RouterProvider router={router}></RouterProvider>;
};

export default App;
