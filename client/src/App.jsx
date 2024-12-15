import React from "react";
import UserHeader from "./pages/user/UserHeader";
import Banner from "./components/Banner";
import ProductContainer from "./components/ProductContainer";
import Footer from "./pages/user/UserFooter";

function App() {
  return (
    <div>
      <header>
        <UserHeader />
      </header>

      <section>
        <Banner />
      </section>
      <section>
        <ProductContainer />
      </section>
      <footer>
        <Footer/>
      </footer>
    </div>
  );
}

export default App;
