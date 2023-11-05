import Error from "../pages/404";
import Home from "../pages/Home";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";

export const nav = [
  {
    path: "/",
    name: "Home",
    element: <Home />,
    isPrivate: true,
  },
  {
    path: "/signup",
    name: "SignUp",
    element: <SignUp />,
    isPrivate: false,
  },
  {
    path: "/signin",
    name: "SignIn",
    element: <SignIn />,
    isPrivate: false,
  },
  {
    path: "*",
    name: "404",
    element: <Error />,
    isPrivate: false,
  },
];
