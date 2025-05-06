import { useEffect } from "react";
import { Header } from "../components/shared/Header";
import { Footer } from "../components/shared/Footer";
import { Outlet } from "react-router-dom";
import { UserHeader } from "../components/user/UserHeader";
import { useSelector } from "react-redux";

// Set user layout
export const UserLayout = () => {
  // Get global user set state
  const user = useSelector((store) => store.user);

  // Get theme
  const { theme } = useSelector((state) => state.theme);

  // Change body theme
  useEffect(() => {
    document.body.style.background = theme ? "#F2E5BF" : "#31363f";
  }, [theme]);

  return (
    <>
      <header>{user ? <UserHeader /> : <Header />}</header>

      <main>
        <Outlet />
      </main>

      <footer>
        <Footer />
      </footer>
    </>
  );
};
