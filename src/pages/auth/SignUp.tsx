import { useState } from "react";
import { signUp } from "../../services/authApi";
import { mapValidationErrors } from "../../utils/mapValidationErrors";
import { Link, useNavigate } from "react-router-dom";

import InputField from "../../components/InputField";

function SignUp() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const navigate = useNavigate();

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const res = await signUp({
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
    });

    if (!res.success) {
      // { fieldName: errorMessage } -> {firstName: "First name is required"}
      const fieldErrors = mapValidationErrors(res.errors);
      setErrors(fieldErrors);
    } else {
      navigate("/login");
    }
  };

  return (
    <div>
      <h1>Signup</h1>
      <form method="POST" onSubmit={handleSignUp}>
        <InputField
          label="First Name"
          name="firstName"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          error={errors.firstName}
        />
        <InputField
          label="Last Name"
          name="lastName"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          error={errors.lastName}
        />
        <InputField
          label="Email"
          name="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={errors.email}
        />
        <InputField
          label="Password"
          name="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={errors.password}
        />
        <InputField
          label="Confirm Password"
          name="confirmPassword"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          error={errors.confirmPassword}
        />
        <Link to="/login">Already have an account? Login</Link>
        <button type="submit">Signup</button>
      </form>
    </div>
  );
}

export default SignUp;
