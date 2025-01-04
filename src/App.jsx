import React from "react";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Login";
import Error from "./pages/Error";
import AppLayout from "./pages/AppLayout";
import Welcome from "./pages/Welcome";
import Dashboard, { fetchAllEntriesLoader } from "./pages/Dashboard";
import JournalEntryDetailed, {
  journalEntryDetailsLoader,
} from "./pages/JournalEntryDetailed";
import AddNewJournalEntry from "./pages/AddNewJournalEntry";
import EditJournalEntry from "./pages/EditJournalEntry";
import LoadingScreen from "./components/LoadingScreen";

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
        loader: fetchAllEntriesLoader,
      },
      {
        path: "/entry/new",
        element: <AddNewJournalEntry />,
      },
      {
        path: "/entry/:id",
        element: <JournalEntryDetailed />,
        loader: journalEntryDetailsLoader,
      },
      {
        path: "/entry/:id/edit",
        element: <EditJournalEntry />,
        loader: journalEntryDetailsLoader,
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} fallbackElement={<LoadingScreen />} />;
};

export default App;
