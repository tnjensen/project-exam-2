import { loginUrl } from "../constants/api"

export async function loginUser(credentials){
    return fetch(loginUrl, {
        method:"POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(credentials)
    })
    .then(data => data.json())
}