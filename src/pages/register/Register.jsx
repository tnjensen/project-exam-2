import './register.scss';
import { Link } from 'react-router-dom';
import { useState } from "react";
import {registerUser} from '../../shared/registerUser.js'
import { useLocalStorage } from '../../hooks/useLocalStorage.jsx';

const Register = () => {
    const [token, setToken] = useLocalStorage("token");
    const [name, setName] = useLocalStorage("user");
    const [email, setEmail] = useLocalStorage("user");
    const [password, setPassword] = useState("");
    const [avatar, setAvatar] = useState("");
    const [error, setError] = useState("");
   
    const handleRegister = async (e) => {
    e.preventDefault();
    
    try{
        const user = await registerUser({
            name,
            email,
            password,
            avatar
        });
        console.log(user)
        window.location.href = "/login";
    }
    catch(err){
        setError(err);
    }
  };
  return (
    <div className='register'>
        <div className='card'>
            <div className='register-left'>
            <h1>Sentire</h1>
                    <p>Register to start sharing with your friends.</p>
                    <span>Already registered ?</span>
                        <Link to="/login">
                        <button>Login</button>
                        </Link>
            </div>
            <div className='register-right'>
                <h1>Sign up</h1>
            <form onSubmit={handleRegister}>
            <input
                type="text"
                placeholder='Name'
                onChange={(e) => setName(e.target.value)}
                required
            />
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
            <input
                type="text"
                placeholder='Avatar-link optional'
                onChange={(e) => setAvatar(e.target.value)}
            />
            <button type="submit">Register</button>
            </form>
        </div>
      </div>
    </div>
  );
};
export default Register;