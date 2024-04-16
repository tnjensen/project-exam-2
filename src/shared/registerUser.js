import { registerUrl } from "../constants/api"

export async function registerUser(credentials){
    return fetch(registerUrl, {
        method:"POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(credentials)
    })
    .then(data => data.json())
}