import React from "react";
import UserHeader from "../pages/user/UserHeader";
import { Outlet } from "react-router-dom";
import UserFooter from "../pages/user/UserFooter";
import SellerHeader from "../pages/seller/SellerHeader";
import { useSelector } from "react-redux";
import Header from "../components/Header";

function Root() {
  const { role } = useSelector((state) => state.role);
  const { home } = useSelector((state) => state.home);
  return (
    <>
      <header>{role === "user" && home ? <UserHeader /> : <Header />}</header>

      <main>
        <Outlet />
      </main>

      <footer>
        <UserFooter />
      </footer>
    </>
  );
}

export default Root;
