import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Root from "./components/Root/Root.tsx";
import ThemeCreator from "./components/ThemeCreator/ThemeCreator.tsx";
import Visualizer from "./components/Visualizer/Visualizer.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "ThemeCreator",
        element: <ThemeCreator />,
      },
      {
        element: <Visualizer />,
        index: true,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
