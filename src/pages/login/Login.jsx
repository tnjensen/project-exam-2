import './login.scss';
import { Link } from 'react-router-dom';
import { useState } from "react";
import { loginUser } from '../../shared/loginUser';
import { useLocalStorage } from '../../hooks/useLocalStorage.jsx';

const Login = () => {
    const [token, setToken] = useLocalStorage("token");
    const [email, setEmail] = useLocalStorage("user");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
   
    const handleLogin = async (e) => {
    e.preventDefault();
    
    try{
        const user = await loginUser({
            email,
            password
        });
        console.log(user)
        setToken(user.accessToken);
        setEmail(user);
        window.location.href = "/";
    }
    catch(err){
        setError(err);
    }
  };
  return (
    <div className='login'>
        <div className='card'>
            <div className='login-left'>
            <h1>Sentire</h1>
                    <p>Log in to connect and share with your friends.</p>
                    <span>No account yet ?</span>
                        <Link to="/register">
                        <button>Register</button>
                        </Link>
            </div>
            <div className='login-right'>
                <h1>Sign in</h1>
            <form onSubmit={handleLogin}>
            <input
                type="email"
                placeholder='Email'
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <input
                type="password"
                placeholder='Password'
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
            />
            <button type="submit">Login</button>
            </form>
        </div>
      </div>
    </div>
  );
};
export default Login;