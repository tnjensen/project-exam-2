import { useEffect, useState } from "react";

export default function useEditPost(url, token, title, desc) {
  const [data, setData] = useState([]);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const options = {
      method: "PUT",
      body: { title: title, body: desc },
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    };
    async function postData() {
      try {
        setIsError(false);
        const response = await fetch(url, options);

        if (response.ok) {
          const json = await response.json();
          return setData(json);
        }
        throw new Error();
      } catch (error) {
        console.log(error);
        setIsError(true);
      }
    }
    postData();
  }, [url, token, desc, title]);
  return { data, isError };
}
