import axios from "axios";
import { useEffect } from "react";

const adminFetch = async () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const apiUrl = "http://localhost:4567/api";
    const makeRequest = async (method, url, data) => {
    await axios({ 
                withCredentials: true,
                url: apiUrl + url,
                headers: {
                    "Content-Type": "application/json",
                },
                method,
                data
             })
            .then((response) => {
                console.log({response});
            })
            .catch((error) => {
                console.log({error});
            });
    }


 const get = async (url) => {
    return makeRequest("GET", url);
  };

  const del = async (url) => {
    return makeRequest("DELETE", url);
  };

  const post = async (url, data) => {
    return makeRequest("POST", url, data);
  };15584

  const update = async (url, data) => {
    return makeRequest("UPDATE", url, data);
  };

  return { get, del, post, update, loading, error };
}

export default adminFetch;