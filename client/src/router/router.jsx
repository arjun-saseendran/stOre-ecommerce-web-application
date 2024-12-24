import { createBrowserRouter } from "react-router-dom";
import { ProtectedRouteUser } from "./ProtectedRouteUser";
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
import { Profile } from "../pages/shared/Profile";
import { SellerLayout } from "../layout/SellerLayout";
import { Settings } from "../components/user/Settings";
import { SellerProducts } from "../pages/seller/SellerProducts";
import { Products } from "../pages/admin/Products";
import { AdminLayout } from "../layout/AdminLayout";
import { ProtectedRouteAdmin } from "./ProtectedRouteAdmin";
import { Users } from "../pages/shared/Users";

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
        element: <ProtectedRouteUser />,

        children: [
          {
            path: "cart",
            element: <Cart />,
          },
          {
            path: "profile",
            element: <Profile role="user" />,
          },
          {
            path: "settings",
            element: <Settings role="user" />,
          },
        ],
      },
    ],
  },
  {
    path: "seller",
    element: <SellerLayout />,
    errorElement: <ErrorPage role="seller" />,
    children: [
      { path: "login", element: <Login role="seller" /> },

      { path: "signup", element: <Signup role="seller" /> },
      {
        element: <ProtectedRouteSeller />,
        children: [
          { path: "", element: <SellerProducts /> },
          { path: "add-product", element: <AddNewProduct /> },
          { path: "profile", element: <Profile role="seller" /> },
          // { path: "settings", element: <Settings role="seller" /> },
        ],
      },
    ],
  },

  {
    path: "admin",
    element: <AdminLayout />,
    errorElement: <ErrorPage role="admin" />,
    children: [
      { path: "login", element: <Login role="admin" /> },

      {
        element: <ProtectedRouteAdmin />,
        children: [
          { path: "", element: <Products action="View" /> },
          { path: "delete-product", element: <Products action="Delete" /> },
          { path: "users", element: <Users role="user" /> },
          { path: "view-user", element: <Users role="user" action="View" /> },
          {
            path: "delete-user",
            element: <Users role="user" action="Delete" />,
          },
          { path: "inactive-users", element: <Users role="user" action="Activate" /> },
          {
            path: "view-seller",
            element: <Users role="seller" action="View" />,
          },
          {
            path: "delete-seller",
            element: <Users role="seller" action="Delete" />,
          },
          { path: "sellers", element: <Users role="seller" /> },
          { path: "inactive-sellers", element: <Users role="seller" /> },
        ],
      },
    ],
  },
]);
