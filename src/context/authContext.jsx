import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { loginUrl } from "../constants/api";

export const AuthContext = createContext();

export const AuthContextProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState(
        JSON.parse(localStorage.getItem("user")) || null
        );

        const login = async (inputs) => {
            const res = await axios.post(loginUrl, inputs, {
                withCredentials:true
            });
            setCurrentUser(res.data);
           /* setCurrentUser({id:1, name: "Jane Doe", profilePic:"/assets/person/1.jpeg" }) */
        }

        useEffect(() => {
            localStorage.setItem("user", JSON.stringify(currentUser));
        }, [currentUser]);

        return(
            <AuthContext.Provider value={{currentUser, login}}>{children}</AuthContext.Provider>
        )
}