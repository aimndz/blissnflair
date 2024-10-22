import { useState } from "react";
import { login } from "../../services/authApi";
import { useNavigate } from "react-router-dom";
import InputField from "../../components/InputField";
import { Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    try {
      const res = await login({ email, password });
      console.log(res);
      navigate("/dashboard");
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
        console.error(error);
      }
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form method="POST" onSubmit={handleLogin}>
        <InputField
          label="Email"
          name="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <InputField
          label="Password"
          name="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p>{error}</p>}
        <Link to="/sign-up">Don't have an account? Sign up</Link>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
