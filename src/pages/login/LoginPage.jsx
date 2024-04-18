import MyLoginForm from "../../components/login/MyLoginForm";
import './login.scss';

function LoginPage() {
	return (
		<div className="container mx-auto mt-12">
			<h1 className="text-center text-2xl">Login</h1>
			<MyLoginForm />
        </div>
	)
}

export default LoginPage;