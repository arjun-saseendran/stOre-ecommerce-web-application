import { ProductList } from "./ProductList";
import { Carrousel } from "../../components/user/Carrousel";
import { Loading } from "../../components/shared/Loading";

export const Home = () => {
  return (
    <div>
      {<Carrousel /> ? <Carrousel /> : <Loading />}
      {<ProductList /> ? <ProductList /> : <Loading />}
    </div>
  );
};
