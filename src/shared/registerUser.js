
export async function registerUser(credentials){

    const registerUrl = import.meta.env.VITE_REGISTER_URL;
    
    return fetch(registerUrl, {
        method:"POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(credentials)
    })
    .then(data => data.json())
}