export async function loginUser(credentials) {
  const loginUrl = import.meta.env.VITE_LOGIN_URL;

  return fetch(loginUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  }).then((data) => data.json());
}
