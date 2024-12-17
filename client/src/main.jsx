import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import Root from "./routes/root.jsx";
import App from "./App.jsx";
import { store } from "./app/store.js";
import { Provider } from "react-redux";
import Login from './components/Login.jsx'
import Signup from "./components/Signup.jsx";
import AddNewProduct from "./pages/seller/AddNewProduct.jsx";
import SellerSignup from "./pages/seller/SellerSignup.jsx";
import SellerLogin from "./pages/seller/SellerLogin.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <App />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/seller-signup",
        element: <SellerSignup/>,
      },
      {
        path: "/seller-login",
        element: <SellerLogin/>,
      },

      {
        path: "/add-new-product",
        element: <AddNewProduct />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
