import { ProductList } from "./ProductList";
import { Carrousel } from "../../components/user/Carrousel";
import { Profile } from "../shared/Profile";

export const Home = () => {
  return (
    <div>
      <Carrousel />
      <ProductList />
      {/* <Profile/> */}
    </div>
  );
};
