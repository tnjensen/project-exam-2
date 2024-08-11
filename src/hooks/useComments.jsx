import { useEffect, useState } from "react";

export default function usePostComments(url, token, desc) {
  const [data, setData] = useState([]);
  const [isError, setIsError] = useState(false);
  const options = {
    method: "POST",
    body: desc,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  };
  useEffect(() => {
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
  });
  return { data, isError };
}
