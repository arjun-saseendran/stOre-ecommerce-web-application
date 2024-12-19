import Carousel from "react-bootstrap/Carousel";

function Banner() {
  return (
    <Carousel data-bs-theme="dark">
      <Carousel.Item>
        <img
          className="d-block w-100 object-object-fit-fill img-fluid"
          style={{ height: "500px" }}
          src="https://www.indiaistore.com/files/uploads/products/iphone-15-pro/iphone-15-new/1-d.jpg"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100 object-object-fit-fill img-fluid"
          style={{ height: "500px" }}
          src="https://www.apple.com/newsroom/images/2023/10/apple-unveils-new-macbook-pro-featuring-m3-chips/article/Apple-MacBook-Pro-2up-231030_Full-Bleed-Image.jpg.xlarge_2x.jpg"
          alt="Second slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100 object-object-fit-fill img-fluid"
          style={{ height: "500px" }}
          src="https://i.ytimg.com/vi/ql6mhhHCldY/maxresdefault.jpg"
        />
      </Carousel.Item>
    </Carousel>
  );
}

export default Banner;
