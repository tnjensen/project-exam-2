import "./loginForm.scss";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { loginUrl } from "../../constants/api";
import { useState } from "react";
import { useUserActions } from "../../stores/useUserStore";

const schema = yup
  .object({
    email: yup
      .string()
      .email("Please enter a valid email")
      .required("Email is required"),
    password: yup.string().required("Please enter a password"),
  })
  .required();

function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const { setUser } = useUserActions();

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
      headers: {
        "Content-Type": "application/json",
      },
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
    } catch (error) {
      setError(error.toString());
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="login">
      <div className="card">
        <div className="login-left">
          <h1>Sentire</h1>
          <p>Log in to connect and share with your friends.</p>
          <span>No account yet ?</span>
          <Link to="/register">
            <button>Register</button>
          </Link>
        </div>
        <div className="login-right">
          <h1>Sign in</h1>
          {errors.email && <p className="error">{errors.email.message}</p>}
          <form onSubmit={handleSubmit(onSubmit)}>
            <fieldset disabled={isLoading}>
              <input
                type="email"
                placeholder="Email"
                {...register("email")}
                required
              />
              {errors.email && <p className={error}>{errors.email.message}</p>}
              <input
                type="password"
                placeholder="Password"
                {...register("password")}
                required
                minLength={6}
              />
              <button type="submit">Login</button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
