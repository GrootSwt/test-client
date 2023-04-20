import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Layout from "../layout";
import Home from "../views/Home";
import Login from "../views/Login";
import Error404 from "../views/Error/404";
import Error50x from "../views/Error/50x";

const routes = [
  {
    path: "/",
    element: <Layout />,
    children: [{ index: true, element: <Home /> }],
    errorElement: <Error404 />,
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
];

const router = createBrowserRouter(routes);

export default router;
