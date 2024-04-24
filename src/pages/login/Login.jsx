import LoginForm from "../../components/login/LoginForm";
import './login.scss';

function Login() {
	return (
		<div className="container mx-auto mt-12">
			<h1 className="text-center text-2xl">Login</h1>
			<LoginForm />
        </div>
	)
}

export default Login;