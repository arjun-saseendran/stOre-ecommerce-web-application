import { useState } from "react";
import { Header } from "../components/user/Header";
import { Footer } from "../components/user/Footer";
import { Outlet } from "react-router-dom";
import { UserHeader } from "../components/user/UserHeader";

// Set user layout
export const UserLayout = () => {
  // Store user authetication
  const [isUserAuth, setUserAuth] = useState(true);

  return (
    <>
      {isUserAuth ? <UserHeader /> : <Header />}

      <div>
        <Outlet />
      </div>
      <Footer />
    </>
  );
};
