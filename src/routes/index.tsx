import { useRoutes } from "react-router-dom";
import Layout from "../Layout/Layout";
import Home from "../components/modules/home/Home";
import KeyAcount from "../components/modules/key/KeyAcount";
import NotFound from "../components/modules/404/NotFound";
import Threads from "../components/modules/threads/Threads";
import FaceBook from "../components/modules/facebook/FaceBook";
import Contact from "../components/modules/contact/Contact";
import { VIDEO_TYPE } from "../types/enum";

const Router = () => {
  const routes = useRoutes([
    {
      path: "/",
      element: <Layout />,
      children: [
        { index: true, element: <Home type={VIDEO_TYPE.DOUYIN} /> },
        { path: "key", element: <KeyAcount /> },
        { path: "threads", element: <Threads type={VIDEO_TYPE.THREADS} /> },
        { path: "facebook", element: <FaceBook type={VIDEO_TYPE.FACEBOOK} /> },
        { path: "contact", element: <Contact /> },
      ],
    },
    { path: "*", element: <NotFound /> },
  ]);

  return routes;
};

export default Router;
