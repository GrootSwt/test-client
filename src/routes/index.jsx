import { createBrowserRouter } from "react-router-dom";
import Layout from "../layout/index";
import Home from "../views/Home";

const routes = [
  {
    path: "/",
    element: <Layout />,
    children: [{ index: true, element: <Home /> }],
  },
];

const router = createBrowserRouter(routes);

export default router;
