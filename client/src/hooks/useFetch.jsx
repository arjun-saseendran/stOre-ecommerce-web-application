import { useEffect, useState } from "react";
import { axiosInstance } from "../config/axiosInstance";

export const useFetch = (url) => {
  // Handle data, loading, error
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(true);

  const fetchData = async () => {
    try {
        // Get response
      const response = await axiosInstance({
        url,
      });
      setTimeout(()=> {
        // Set data
        setData(response?.data?.data)
        // Set loading false
        setLoading(false)
      }, 1000)
    } catch (error) {
        // Set error
        setError(error)
    }finally{
        // Set loading
        setLoading(false)
    }
  };
// Render when loading page
  useEffect(()=> {
fetchData()
  },[])
// send response
  return [data, loading, error]
};
