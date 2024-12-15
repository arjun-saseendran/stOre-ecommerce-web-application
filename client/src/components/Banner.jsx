import Carousel from "react-bootstrap/Carousel";

function Banner() {
  return (
    <Carousel data-bs-theme="dark">
      <Carousel.Item>
        <img
          className="d-block w-100 "
          src="https://img.freepik.com/free-psd/horizontal-banner-template-big-sale-with-woman-shopping-bags_23-2148786755.jpg?w=2000&t=st=1727934168~exp=1727934768~hmac=86ecb2e81f5eb82e39f37d6fa49c0214a6d2f97f210ea1bf6715b9224273fad9"
          alt="First slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://img.freepik.com/free-psd/modern-sales-banner-template_23-2148995448.jpg?w=2000&t=st=1727934318~exp=1727934918~hmac=5b5dc070caa4e3c091d6b19fa1db5224567fbfd180810c4e3ca5b9c9d5687304"
          alt="Second slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100 "
          src="https://img.freepik.com/free-psd/horizontal-banner-online-fashion-sale_23-2148585404.jpg?w=2000&t=st=1727934375~exp=1727934975~hmac=2c35b080c9048237f700307e36603c948785d94156739c7fd05c96e622eca52b"
          alt="Third slide"
        />
      </Carousel.Item>
    </Carousel>
  );
}

export default Banner;
