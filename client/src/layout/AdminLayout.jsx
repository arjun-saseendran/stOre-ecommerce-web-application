import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { AdminHeader } from "../components/admin/AdminHeader";
import { Header } from "../components/shared/Header";
import { Footer } from "../components/shared/Footer";

export const AdminLayout = () => {
  const { theme } = useSelector((state) => state.theme);
  const admin = useSelector((store) => store.admin);

  useEffect(() => {
    document.body.style.background = theme ? "#F2E5BF" : "#31363f";
  }, [theme]);

  return (
    <>
      <header>{admin ? <AdminHeader /> : <Header />}</header>
      <main>
        <Outlet />
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
};
