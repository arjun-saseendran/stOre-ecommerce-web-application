import React from "react";
import UserHeader from "../pages/user/UserHeader";
import { Outlet } from "react-router-dom";
import UserFooter from "../pages/user/UserFooter";
import SellerHeader from "../pages/seller/SellerHeader";
import { useSelector } from "react-redux";

function Root() {
  const { role } = useSelector((state) => state.role);
  return (
    <>
      <header>{role === "user" ? <UserHeader /> : <SellerHeader />}</header>

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
