import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  Filler,
  CategoryScale,
} from "chart.js";
import { useEffect, useState } from "react";
import { axiosInstance } from "../../config/axiosInstance";
import { useSelector } from "react-redux";

// Register chartjs components
ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  CategoryScale,
  Filler
);

export const LineChart = () => {
  // Get current theme
  const { theme } = useSelector((state) => state.theme);

  // Store chart data
  const [chart, setChart] = useState(null);

  // Api call
  useEffect(() => {
    const fetchOrderData = async () => {
      try {
        const response = await axiosInstance({
          method: "GET",
          url: "/order/get-orders",
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
              label: "Order Totals",
              data: totalPrices,
              borderColor: "orange",
              backgroundColor: "rgba(255, 165, 0, 0.3)",
              pointBackgroundColor: "orange",
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

      {chart ? <Line data={chart} /> : <p>Loading...</p>}
    </div>
  );
};
