import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useEffect, useState } from "react";
import { axiosInstance } from "../../config/axiosInstance";
import { useSelector } from "react-redux";

// Register chartjs components
ChartJS.register(ArcElement, Tooltip, Legend);

export const DoughnutChart = ({ role = "admin" }) => {
  // Get current theme
  const { theme } = useSelector((state) => state.theme);

  // Store chart data
  const [chartData, setChartData] = useState(null);

  // Handle role
  const user = {
    role: "admin",
    chart: "/order/orders-total-price-by-category",
  };

  // Handle seller role
  if (role === "seller") {
    (user.role = "seller"),
      (user.chart = "/order/seller-orders-total-price-by-category");
  }

  // Api call
  useEffect(() => {
    const fetchOrderData = async () => {
      try {
        const response = await axiosInstance({
          method: "GET",
          url: user.chart,
          withCredentials:true
        });
        const orders = response?.data?.data;

        const category = orders.reduce((acc, order) => {
          acc[order.category] = (acc[order.category] || 0) + order.totalPrice;
          return acc;
        }, {});

        setChartData({
          labels: Object.keys(category),
          datasets: [
            {
              label: "Sales by Category ₹",
              data: Object.values(category),
              backgroundColor: [
                "rgba(255, 99, 132, 0.6)",
                "rgba(54, 162, 235, 0.6)",
                "rgba(255, 206, 86, 0.6)",
                "rgba(75, 192, 192, 0.6)",
                "rgba(153, 102, 255, 0.6)",
              ],
              borderColor: [
                "rgba(255, 99, 132, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
                "rgba(75, 192, 192, 1)",
                "rgba(153, 102, 255, 1)",
              ],
              borderWidth: 1,
            },
          ],
          options: {
            responsive: true,
          },
        });
      } catch (error) {
        console.log(error);
      }
    };
    fetchOrderData();
  }, []);

  return (
    <div>
      <h1 className={theme ? "text-black" : "text-white"}>Category Trends</h1>

      {chartData ? <Doughnut data={chartData} /> : <p>Loading...</p>}
    </div>
  );
};
