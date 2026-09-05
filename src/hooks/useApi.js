import { useEffect, useState } from "react";
import { getAuthHeaders, unwrap, normalize } from "../shared/apiClient";

export default function useGetPosts(url, token) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const options = {
      method: "GET",
      headers: getAuthHeaders({ Authorization: "Bearer " + token }),
    };
    async function getData() {
      try {
        setIsLoading(true);
        setIsError(false);
        const response = await fetch(url, options);

        if (response.ok) {
          const json = await response.json();
          return setData(normalize(unwrap(json)));
        }
        throw new Error();
      } catch (error) {
        console.log(error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }
    getData();
  }, [url, token]);
  return { data, isLoading, isError };
}