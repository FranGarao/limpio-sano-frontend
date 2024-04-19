import axios from "axios";

const useApiRequest = () => {
  const apiUrl = "http://localhost:4567/api";
  
  const makeRequest = async (method, url, data) => {
    try {
      const response = await axios({
        withCredentials: true,
        url: apiUrl + url,
        headers: {
          "Content-Type": "application/json",
        },
        method,
        data,
      });
      return response.data; // Return the actual data
    } catch (error) {
      console.error("Error making request:", error);
      throw error;
    }
  };

  const get = async (url) => {
    return makeRequest("GET", url);
  };

  const del = async (url) => {
    return makeRequest("DELETE", url);
  };

  const post = async (url, data) => {
    return makeRequest("POST", url, data);
  };

  const update = async (url, data) => {
    return makeRequest("UPDATE", url, data);
  };

  return { get, del, post, update };
};

export default useApiRequest;