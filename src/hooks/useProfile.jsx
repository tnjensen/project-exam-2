import { useEffect, useState } from "react";

export default function GetProfiles(url,token){
    const [data,setData] = useState([]);
    const [isLoading,setIsLoading] = useState(false);
    const [isError,setIsError] = useState(false);
    const options = {
        method: "GET",
        headers : {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        }
    };
    useEffect(() => {
        async function getData(){
            try{
                setIsLoading(true);
                setIsError(false);
                const response = await fetch(url,options);

                if(response.ok){
                    const json = await response.json();
                    return setData(json);
                }
                throw new Error();
            }
            catch(error){
                console.log(error);
                setIsError(true);
            } finally{
                setIsLoading(false);
            }
        }
        getData();
    }, [url])
    return {data, isLoading, isError};
}