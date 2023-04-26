import React from "react";
import { createBrowserRouter } from "react-router-dom";
import App from "../views/App";
import Layout from "../layout";
import Home from "../views/Home";
import AbortRequest from "../views/AbortRequest";
import NotAbortRequest from "../views/NotAbortRequest";
import Login from "../views/Login";
import Error404 from "../views/Error/404";
import Error50x from "../views/Error/50x";

const routes = [
  {
    path: "/",
    element: <App />,
    errorElement: <Error404 />,
    children: [
      {
        path: "/",
        element: <Layout />,
        children: [
          {
            index: true,
            element: <Home />,
          },
          {
            path: "abort-request",
            element: <AbortRequest />,
          },
          {
            path: "not-abort-request",
            element: <NotAbortRequest />,
          },
        ],
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/error",
        children: [
          {
            path: "404",
            element: <Error404 />,
          },
          {
            path: ":code",
            element: <Error50x />,
          },
        ],
      },
    ],
  },
];

const router = createBrowserRouter(routes);

export default router;
