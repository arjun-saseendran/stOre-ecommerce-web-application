import axios from "axios";

export const apiHandler = async (
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

    return [response.data.data, null];
  } catch (error) {
    return [null, error];
  }
};


