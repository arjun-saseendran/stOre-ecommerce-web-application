import axios from "axios";

const apiCall = async (
  url,
  method,
  data = null,
  headers = {},
  withCredentials = true
) => {
  try {
    const response = await axios({
      url,
      method,
      data,
      headers,
      withCredentials,
    });

    return [response.data, null];
  } catch (error) {
    return [null, error];
  }
};

export { apiCall };
