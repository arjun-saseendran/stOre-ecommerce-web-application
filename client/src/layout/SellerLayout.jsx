import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { SellerHeader } from "../components/seller/SellerHeader";
import { Footer } from "../components/shared/Footer";
import { Header } from "../components/shared/Header";

export const SellerLayout = () => {
  const { theme } = useSelector((state) => state.theme);
  const seller = useSelector((store) => store.seller);

  useEffect(() => {
    document.body.style.background = theme ? "#F2E5BF" : "#31363f";
  }, [theme]);

  return (
    <>
      {seller ? <SellerHeader /> : <Header />}

      <main>
        <Outlet />
      </main>

      <footer>
        <Footer />
      </footer>
    </>
  );
};
