import { createBrowserRouter } from "react-router-dom";
import { ProtectedRouteUser } from "./ProtectedRouteUser";
import { UserLayout } from "../layout/UserLayout";
import { Home } from "../pages/user/Home";
import { About } from "../pages/user/About";
import { Contact } from "../pages/user/Contact";
import { ProductList } from "../pages/user/ProductList";
import { ProductDetails } from "../pages/shared/ProductDetails";
import { Signup } from "../pages/shared/Signup";
import { Login } from "../pages/shared/Login";
import { Cart } from "../pages/user/Cart";
import { ErrorPage } from "../pages/shared/ErrorPage";
import { ProtectedRouteSeller } from "./ProtectedRouteSeller";
import { AddNewProduct } from "../pages/shared/AddNewProduct";
import { Profile } from "../pages/shared/Profile";
import { SellerLayout } from "../layout/SellerLayout";
import { Settings } from "../components/user/Settings";
import { Products } from "../pages/shared/Products";
import { AdminLayout } from "../layout/AdminLayout";
import { ProtectedRouteAdmin } from "./ProtectedRouteAdmin";
import { Users } from "../pages/shared/Users";
import { AddBanner } from "../components/shared/AddBanner";
import { Banners } from "../pages/shared/Banners";
import { AddReview } from "../pages/user/AddReview";
import { Wishlist } from "../pages/user/Wishlist";
import { ForgotPassword } from "../pages/shared/ForgotPassword";
import { ResetPassword } from "../pages/shared/ResetPassword";

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
        path: "forgot-password",
        element: <ForgotPassword role="user" />,
      },
      {
        path: "reset-password/:token",
        element: <ResetPassword role="user" />,
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
        path: "product-details/:productId",
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
          {
            path: "add-review/:productId",
            element: <AddReview />,
          },
          {
            path: "wishlist",
            element: <Wishlist />,
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
        path: "forgot-password",
        element: <ForgotPassword role="seller" />,
      },
      {
        path: "reset-password/:token",
        element: <ResetPassword role="seller" />,
      },

      {
        element: <ProtectedRouteSeller />,
        children: [
          { path: "", element: <Products role="seller" action="View" /> },
          {
            path: "delete-product",
            element: <Products role="seller" action="Delete" />,
          },
          { path: "add-product", element: <AddNewProduct role="seller" /> },
          { path: "add-banner", element: <AddBanner role="seller" /> },
          {
            path: "product-details/:productId",
            element: <ProductDetails role="seller" action="View" />,
          },
          { path: "profile", element: <Profile role="seller" /> },
          {
            path: "banners",
            element: <Banners />,
          },
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
        path: "forgot-password",
        element: <ForgotPassword role="admin" />,
      },
      {
        path: "reset-password/:token",
        element: <ResetPassword role="admin" />,
      },

      {
        element: <ProtectedRouteAdmin />,
        children: [
          { path: "", element: <Products action="View" role="admin" /> },
          {
            path: "delete-product",
            element: <Products role="admin" action="Delete" />,
          },
          {
            path: "users",
            element: <Users role="user" status="active" action="Deactivate" />,
          },
          { path: "profile", element: <Profile role="admin" /> },

          {
            path: "delete-user",
            element: <Users role="user" action="Delete" />,
          },
          {
            path: "inactive-users",
            element: <Users role="user" action="Activate" status="inactive" />,
          },
          {
            path: "deactivate-seller",
            element: (
              <Users role="seller" action="Deactivate" status="active" />
            ),
          },

          {
            path: "delete-seller",
            element: <Users role="seller" action="Delete" status="active" />,
          },
          {
            path: "sellers",
            element: (
              <Users role="seller" status="active" action="Deactivate" />
            ),
          },
          {
            path: "seller-details/:userId",
            element: <Profile role="seller" action="Details" />,
          },
          {
            path: "inactive-sellers",
            element: (
              <Users role="seller" action="Activate" status="inactive" />
            ),
          },
          { path: "add-product", element: <AddNewProduct role="admin" /> },
          {
            path: "product-details/:productId",
            element: <ProductDetails role="admin" action="View" />,
          },
          {
            path: "banners",
            element: <Banners />,
          },
          {
            path: "delete/banner",
            element: <Banners />,
          },
          { path: "add-banner", element: <AddBanner role="admin" /> },
        ],
      },
    ],
  },
]);
