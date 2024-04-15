import { useEffect, useState } from "react";
import axios from "axios";

const useFetch = () => {
  // const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const apiUrl = "http://localhost:4567/api";

  const makeRequest = async (method, url, data) => {
    setLoading(true);
    setError(false);
    try {
      if (method === "POST" && data.email) {
        const response = await axios({
          method,
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          url: apiUrl + url,
          data,
      }) 
        return response.data;
      }
      const response = await axios({
        method,
        url: apiUrl + url,
        data,
      });
      return response.data;
    } catch (error) {
      setError(error);
      console.log(error);
    } finally {
      setLoading(false);
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
  useEffect(() => {
    console.log("fetching data", apiUrl);
  }, []);

  return { get, del, post, update, loading, error };
};

export default useFetch;
