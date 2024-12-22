import Carousel from "react-bootstrap/Carousel";
import { useSelector } from "react-redux";

export const Carrousel = () => {

  // Get theme
  const {theme} = useSelector((state)=> state.theme)

  return (
    <Carousel data-bs-theme="dark">
      {theme ? (
        <Carousel.Item>
          <img
            className="d-block w-100 object-object-fit-fill img-fluid"
            src="https://fox2now.com/wp-content/uploads/sites/14/2023/01/iPhone-15-Rumors.jpg?w=1752&h=986&crop=1"
          />
        </Carousel.Item>
      ) : (
        <Carousel.Item>
          <img
            className="d-block w-100 object-object-fit-fill img-fluid"
            src="https://www.indiaistore.com/files/uploads/products/iphone-15-pro/iphone-15-new/1-d.jpg"
          />
        </Carousel.Item>
      )}
      {theme ? (
        <Carousel.Item>
          <img
            className="d-block w-100 object-object-fit-fill img-fluid"
            src="https://img-cdn.inc.com/image/upload/f_webp,q_auto,c_fit/images/panoramic/yellow-iphone_529907_dmr5ih.jpg"
          />
        </Carousel.Item>
      ) : (
        <Carousel.Item>
          <img
            className="d-block w-100 object-object-fit-fill img-fluid"
            src="https://www.apple.com/newsroom/images/2023/10/apple-unveils-new-macbook-pro-featuring-m3-chips/article/Apple-MacBook-Pro-2up-231030_Full-Bleed-Image.jpg.xlarge_2x.jpg"
            alt="Second slide"
          />
        </Carousel.Item>
      )}
      {theme ? (
        <Carousel.Item>
          <img
            className="d-block w-100 object-object-fit-fill img-fluid"
            src="https://shop.arizona.edu/core/media/media.nl?id=5819414&c=4456575&h=9rPVSAZ-W2G5eUZvbcpKJz2mheiX31FhR7dVPGjf3iGxs9z8"
          />
        </Carousel.Item>
      ) : (
        <Carousel.Item>
          <img
            className="d-block w-100 object-object-fit-fill img-fluid"
            src="https://i.ytimg.com/vi/ql6mhhHCldY/maxresdefault.jpg"
          />
        </Carousel.Item>
      )}
    </Carousel>
  );
};
