import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import ServerWarning from "../shared/ServerWarning";
import ValidationMessage from "../shared/ValidationMessage";
import { registerUrl } from "../../constants/api";
import { useState } from "react";
import { useUserActions } from "../../stores/useUserStore";

const schema = yup
	.object({
		name: yup.string().required("Name is required"),
        email: yup.string().email("Please enter a valid email").required("Email is required"),
		password: yup.string().min(6).max(10).required("Please enter a password between 6 and 10 characters long, using a number, at least one capital letter and one special character"),
        banner: yup.string(),
        avatar: yup.string()
    })
	.required();

const RegisterForm = () => {
    const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);

	/* const { setUser } = useUserActions(); */

	const navigate = useNavigate();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
	});

	async function onSubmit(data) {

		const options = {
			headers: { "Content-Type": "application/json" },
			method: "POST",
			body: JSON.stringify(data),
		};

		try {
			setIsLoading(true);
			setError(null);
			const response = await fetch(registerUrl, options);
			const json = await response.json();

			if (!response.ok) {
				return setError(json.errors?.[0]?.message ?? "There was an error");
			}

			/* setUser(json); */
			navigate("/login");

			// store user in global state
			/// redirect to dahsboard
		} catch (error) {
			setError(error.toString());
		} finally {
			setIsLoading(false);
		}
	}
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
            <form onSubmit={handleSubmit(onSubmit)}>
            {error && <ServerWarning>{error}</ServerWarning>}
            <input
                type="text"
                placeholder='Name'
                {...register("name")}
                required
            />
            <input
                type="email"
                placeholder='Email'
                {...register("email")}
                required
            />
            <input
                type="password"
                placeholder='Password'
                {...register("password")}
                required
                minLength={6}
            />
            <input
                type="text"
                placeholder='Avatar-link optional'
                {...register("avatar")}
            />
            <button type="submit">Register</button>
            </form>
        </div>
      </div>
    </div>
  );
};
export default RegisterForm;