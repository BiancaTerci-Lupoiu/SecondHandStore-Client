import { createBrowserRouter } from "react-router-dom";
import CheckoutSuccess from "../components/CheckoutSuccess";
import AboutPage from "../pages/AboutPage";
import AddPost from "../pages/AddPost";
import Login from "../pages/Login";
import MainPage from "../pages/MainPage";
import Maps from "../pages/Maps";
import PostDetails from "../pages/PostDetails";
import RootLayout from "../pages/Root";
import SignUp from "../pages/SignUp";
import UserProfile from "../pages/UserProfile";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    //loader: tokenLoader,
    children: [
      {
        index: true,
        element: <AboutPage />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "sign-up",
        element: <SignUp />,
      },
      {
        index: true,
        path: "main",
        element: <MainPage />,
        //loader: checkAuthLoader,
      },
      {
        path: "sell-item",
        element: <AddPost />,
      },
      {
        path: "posts/:postId",
        element: <PostDetails />,
      },
      {
        path: "/checkout-success",
        element: <CheckoutSuccess />,
      },
      {
        path: "/user-profile",
        element: <UserProfile />,
      },
      {
        path: "map",
        element: <Maps />,
      },
    ],
  },
]);
