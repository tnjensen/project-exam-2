import MyRegisterForm from "../../components/register/RegisterForm";
import './register.scss';

function Register() {
	return (
		<div className="container mx-auto mt-12">
			<h1 className="text-center text-2xl">Register</h1>
			<MyRegisterForm />
        </div>
	)
}

export default Register;