import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useEffect, useState } from "react";
import { axiosInstance } from "../../config/axiosInstance";
import { useSelector } from "react-redux";

// Register chartjs components
ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
);

export const BarChart = ({role = 'admin'}) => {
  // Get current theme
  const { theme } = useSelector((state) => state.theme);

  // Store chart data
  const [chart, setChart] = useState(null);

  // Handle role
  const user = {
    role: "admin",
    chart: "/order/get-orders",
  };

  // Handle seller role
  if (role === "seller") {
    (user.role = "seller"), 
    (user.chart = "order/get-seller-orders");
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

        const labels = orders.map((order) =>
          new Date(order?.createdAt).toLocaleDateString()
        );

        const totalPrices = orders.map((order) => order?.totalPrice);

        // Store chart data
        setChart({
          labels,
          datasets: [
            {
              label: "Order Totals Price ₹",
              data: totalPrices,
              borderColor: "rgba(255, 206, 86, 1)",
              backgroundColor: "rgba(255, 206, 86, 0.6)",
              borderWidth: 1,
              fill: false,
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
      <h1 className={theme ? "text-black" : "text-white"}>Sales Trends</h1>

      {chart ? <Bar data={chart} /> : <p>Loading...</p>}
    </div>
  );
};
