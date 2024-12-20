import { createBrowserRouter } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute";
import { UserLayout } from "../layout/UserLayout";
import { Home } from "../pages/user/Home";
import { About } from "../pages/user/About";
import { Contact } from "../pages/user/Contact";
import { ProductList } from "../pages/user/ProductList";
import { ProductDetails } from "../pages/user/ProductDeatils";
import { Signup } from "../pages/shared/Signup";
import { Login } from "../pages/shared/Login";
import { Cart } from "../pages/user/Cart";
import { ErrorPage } from "../pages/shared/ErrorPage";
import { ProtectedRouteSeller } from "./ProtectedRouteSeller";
import { AddNewProduct } from "../pages/seller/AddNewProduct";

export const router = createBrowserRouter([
  {
    path: "",
    element: <UserLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "signup",
        element: <Signup />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "products",
        element: <ProductList />,
      },
      {
        path: "product-details/:id",
        element: <ProductDetails />,
      },
      {
        path: "user",
        element: <ProtectedRoute />,

        children: [
          {
            path: "cart",
            element: <Cart />,
          },
        ],
      },
      {
        path: "seller",
        errorElement: <ErrorPage role="seller" />,
        children: [
          { path: "login", element: <Login role="seller" /> },

          { path: "signup", element: <Signup role="seller" /> },
          {
            element: <ProtectedRouteSeller />,
            children: [{ path: "add-product", element: <AddNewProduct /> }],
          },
        ],
      },
    ],
  },
]);
