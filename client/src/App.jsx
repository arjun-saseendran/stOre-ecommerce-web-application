import React from "react";
import UserHeader from "./pages/user/UserHeader";
import Footer from "./pages/user/UserFooter";
import UserForm from "./pages/user/UserForm";

function App() {
  return (
    <>
      <header>
        <UserHeader />
      </header>
<section>
  <UserForm/>
</section>
      
      <footer>
        <Footer/>
      </footer>
    </>
  );
}

export default App;
