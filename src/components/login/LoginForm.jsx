import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import ServerWarning from "../shared/ServerWarning";
import ValidationMessage from "../shared/ValidationMessage";
import { loginUrl } from "../../constants/api";
import { useState } from "react";
import { useUserActions } from "../../stores/useUserStore";

console.log(useUserActions);

const schema = yup
	.object({
		email: yup.string().email("Please enter a valid email").required("Email is required"),
		password: yup.string().required("Please enter a password"),
	})
	.required();

function LoginForm() {
	// const [data, setData] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);

	const { setUser } = useUserActions();

	const navigate = useNavigate();

	console.log(setUser);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
	});

	console.log(errors);

	async function onSubmit(data) {
		console.log(data);

		const options = {
			headers: { "Content-Type": "application/json" },
			method: "POST",
			body: JSON.stringify(data),
		};

		try {
			setIsLoading(true);
			setError(null);
			const response = await fetch(loginUrl, options);
			const json = await response.json();

			if (!response.ok) {
				return setError(json.errors?.[0]?.message ?? "There was an error");
			}

			setUser(json);
			navigate("/");

			// store user in global state
			/// redirect to dahsboard
		} catch (error) {
			setError(error.toString());
		} finally {
			setIsLoading(false);
		}
	}

	return (
		<div className="flex mt-4 justify-center">
			<form className="bg-gray-800 p-8 w-full" onSubmit={handleSubmit(onSubmit)}>
				<fieldset disabled={isLoading}>
					{error && <ServerWarning>{error}</ServerWarning>}
					<div className="form-control w-full max-w-md mx-auto">
						<label className="label px-2">
							<span className="label-text text-white">Email</span>
						</label>
						<input className="p-3" placeholder="email" {...register("email")} />
						{errors.email && <ValidationMessage>{errors.email.message}</ValidationMessage>}
					</div>
					<div className="form-control w-full max-w-md mx-auto">
						<label className="label px-2">
							<span className="label-text text-white">Password</span>
						</label>
						<input className="p-3" placeholder="password" {...register("password")} type="password" />
						{errors.password && <ValidationMessage>{errors.password.message}</ValidationMessage>}
					</div>
					<div className="form-control w-full max-w-md mx-auto">
						<button className="bg-secondary hover:bg-primary mt-8 text-white font-bold py-4 px-4 rounded">
							{isLoading ? "Logging in..." : "Login"}
						</button>
					</div>
				</fieldset>
			</form>
		</div>
	);
}

export default LoginForm;
