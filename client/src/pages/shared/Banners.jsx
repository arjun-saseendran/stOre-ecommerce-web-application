import { useEffect, useState } from "react";
import { Table, Container, Button, Row } from "react-bootstrap";
import { axiosInstance } from "../../config/axiosInstance";
import { useSelector } from "react-redux";

export const Banners = () => {
  // Get theme
  const { theme } = useSelector((state) => state.theme);

  // Store banners
  const [banners, setBanners] = useState([]);
  const [deleteBanner, setDeleteBanner] = useState({});

  // Api call
  useEffect(() => {
    (async () => {
      try {
        const response = await axiosInstance({
          method: "GET",
          url: "/banner/banners",
        });
        setBanners(response?.data?.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [deleteBanner, banners]);

  // Handle delete
  const handleDelete = async (bannerId) => {
    try {
      const response = await axiosInstance({
        method: "DELETE",
        url: "/banner/delete-banner",
        data: { bannerId },
      });
      setDeleteBanner(response?.data?.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Container>
      <h1 className="text-center text-white mt-5">Banner List</h1>
      <Row
        className="mt-5 p-3 rounded-3"
        style={{ backgroundColor: theme ? "#FFF6E3" : "#d9d9d9" }}
      >
        <Table className="rounded-3">
          <thead className="rounded-3">
            <tr>
              <th style={{ backgroundColor: theme ? "#FFF6E3" : "#d9d9d9" }}>
                Title
              </th>

              <th style={{ backgroundColor: theme ? "#FFF6E3" : "#d9d9d9" }}>
                Image
              </th>
              <th style={{ backgroundColor: theme ? "#FFF6E3" : "#d9d9d9" }}>
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {banners?.map((banner) => (
              <tr key={banner._id}>
                <td style={{ backgroundColor: theme ? "#FFF6E3" : "#d9d9d9" }}>
                  {banner.title}
                </td>

                <td style={{ backgroundColor: theme ? "#FFF6E3" : "#d9d9d9" }}>
                  <img src={banner?.image} height="100px" alt="banner" />
                </td>
                <td style={{ backgroundColor: theme ? "#FFF6E3" : "#d9d9d9" }}>
                  <Button
                    variant={theme ? "warning" : "dark"}
                    className=" text-white btn-sm"
                    onClick={() => handleDelete(banner._id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Row>
    </Container>
  );
};
