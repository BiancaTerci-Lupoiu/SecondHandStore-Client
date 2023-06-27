import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../pages/Root";
import AboutPage from "../pages/AboutPage";
import SignUp from "../pages/SignUp";
import MainPage from "../pages/MainPage";
import AddPost from "../pages/AddPost";
import PostDetails from "../pages/PostDetails";
import CheckoutSuccess from "../components/CheckoutSuccess";
import UserProfile from "../pages/UserProfile";
import Maps from "../pages/Maps";
import Login from "../pages/Login";
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
