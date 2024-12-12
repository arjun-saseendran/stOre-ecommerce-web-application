import Carousel from "react-bootstrap/Carousel";

function Banner() {
  return (
    <Carousel data-bs-theme="dark">
      <Carousel.Item>
        <img
          style={{ height: "300px" }}
          className="d-block w-100"
          src="https://about.att.com/ecms/dam/snr/2022/september2022/storylevelbanner/iconic_STORY_LEVEL_BANNER_1600x483.jpg"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          style={{ height: "300px" }}
          className="d-block w-100"
          src="https://i0.wp.com/jswordsmith.com/wp-content/uploads/2023/09/Screenshot-2023-09-15-at-12.39.11%E2%80%AFPM-scaled.jpeg?w=2048&ssl=1"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          style={{ height: "300px" }}
          className="d-block w-100 "
          src="https://www.indiaistore.com/files/uploads/products/iphone-15-pro/iphone-15-new/1-d.jpg"
        />
      </Carousel.Item>
    </Carousel>
  );
}

export default Banner;
