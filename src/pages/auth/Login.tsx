import { useState } from "react";
import { login } from "../../services/authApi";
import { getUserProfile } from "../../services/utilsApi";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../../components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import GoogleIcon from "../../components/icons/GoogleIcon";
import { useUser } from "../../hooks/use-user";
import Logo from "../../components/icons/Logo";
import Logo2 from "../../components/icons/Logo2";
import { Eye, EyeOff } from "lucide-react";
// Import your eye icons

// Define form schema
const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, { message: "" }),
});

function Login() {
  const navigate = useNavigate();
  const { setUser } = useUser();
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State for password visibility

  // Initialize form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleLogin = async (values: z.infer<typeof formSchema>) => {
    try {
      await login({
        email: values.email,
        password: values.password,
      });

      const userProfile = await getUserProfile();

      // Make the login page only accessible to users
      if (userProfile.user?.role !== "USER") {
        throw new Error("Invalid email or password");
      }

      // Set user context if role is USER
      setUser(userProfile.user);
      navigate("/dashboard");
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
        console.error(error);
      }
    }
  };

  const handleGoogleLogin = async () => {
    try {
      // Redirect to the Google OAuth2 endpoint
      window.location.href = `${import.meta.env.VITE_API_URL}/auth/google`;
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
        console.error(error);
      }
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-2rem)] flex-col justify-center text-center">
      <div>
        <Logo2 className="fixed -bottom-36 -right-36 aspect-auto w-[800px] opacity-20" />
      </div>
      <div className="z-50 mx-auto w-full max-w-sm rounded-xl border border-solid border-secondary-600 bg-secondary-100 p-8 shadow-xl">
        <Link to="/">
          <div className="mx-auto flex w-10 justify-center">
            <Logo />
          </div>
          <div className="mb-6 text-2xl">
            <p className="font-bold">BLISS & FLAIR</p>
            <p className="-mt-2 text-xs font-normal uppercase">
              Commercial Building
            </p>
          </div>
        </Link>
        <h1 className="text-xl font-bold">Login</h1>
        <p className="mb-8 text-sm text-secondary-800">
          Welcome back! Please login to continue.
        </p>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleLogin)} className="space-y-5">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        {...field}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 flex items-center pr-3"
                      >
                        {showPassword ? (
                          <Eye className="text-secondary-600" size={20} />
                        ) : (
                          <EyeOff className="text-secondary-600" size={20} />
                        )}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {error && <FormMessage>{error}</FormMessage>}
            <div className="text-right">
              <Link
                to="/forgot-password"
                className="text-sm text-secondary-800 underline"
              >
                Forgot password?
              </Link>
            </div>
            <Button
              type="submit"
              className="w-full rounded-full bg-primary-100 font-bold text-secondary-900 hover:bg-primary-200"
            >
              Login
            </Button>
            <div className="mt-5">
              <Link
                to="/sign-up"
                className="text-sm text-secondary-800 hover:underline"
              >
                Don't have an account?{" "}
                <span className="font-semibold">Sign up</span>
              </Link>
            </div>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-secondary-100 px-2 text-secondary-800">
                  or
                </span>
              </div>
            </div>
            <Button
              type="button"
              className="w-full rounded-full border border-solid border-secondary-600 bg-secondary-100 text-secondary-700 hover:bg-secondary-200"
              onClick={handleGoogleLogin}
            >
              <div className="scale-125">
                <GoogleIcon />
              </div>
              Continue with Google
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}

export default Login;
