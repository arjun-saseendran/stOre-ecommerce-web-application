import React from "react";
import UserHeader from "../pages/user/UserHeader";
import { Outlet } from "react-router-dom";
import UserFooter from "../pages/user/UserFooter";
import Banner from '../../src/components/Banner'

function Root() {
  return (
    <>
      <header>
        <UserHeader />
      </header>
      <Banner/>
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
