
import Card from "react-bootstrap/Card";
import { apiHandler } from "../../utils/apiHandler";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function ProductDetails() {
  // Set product
  const [product, setProduct] = useState({});

  // Get api url
  const apiUrl = import.meta.env.VITE_API_URL;

  // Config params
  const { id } = useParams();

  useEffect(() => {
    (async () => {
      // Api call
      const [response, error] = await apiHandler(
        `${apiUrl}/api/v1/product/product-details/${id}`,
        "GET"
      );
      if (response) {
        setProduct(response);
      } else {
        console.log(error);
      }
    })();
  }, []);

  return (
    <Card className="crd-box">
      <Card.Img
        className="crd-image object-fit-contain"
        variant="top"
        src={product.image}
      />
      <Card.Body>
        <Card.Title className="crd-title">{product.title}</Card.Title>

        <Card.Text className="crd-description">{product.description}</Card.Text>
        <Card.Text className=" crd-price fw-bold text-center fw-bolder h5">
          ₹{product.price}
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default ProductDetails;
