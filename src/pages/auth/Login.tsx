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

// Define form schema
const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 8 characters" }),
});

function Login() {
  const navigate = useNavigate();
  const { setUser } = useUser();
  const [error, setError] = useState("");

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

      // Set user context
      if (userProfile.user) {
        setUser(userProfile.user);
      }

      if (userProfile) {
        // Navigate based on role
        if (userProfile.user?.role === "ADMIN") {
          navigate("/admin/dashboard");
        } else {
          navigate("/dashboard");
        }
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
        console.error(error);
      }
    }
  };

  return (
    <div className="flex h-screen flex-col justify-center text-center">
      <div className="mx-auto w-full max-w-sm rounded-xl border border-solid border-secondary-600 bg-secondary-100 p-8 shadow-xl">
        <div>
          {/* Replace with logo */}
          <h1 className="text-2xl font-bold text-primary-100">// Logo</h1>
          {/* <img src="" alt="logo" /> */}
        </div>
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
                    <Input type="password" placeholder="Password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {error && <FormMessage>{error}</FormMessage>}
            <div className="text-right">
              <Link to="" className="text-sm text-secondary-800 underline">
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
            <p className="text-sm text-secondary-800">or</p>
            <Button
              type="button"
              className="w-full rounded-full border border-solid border-secondary-600 bg-secondary-100 text-secondary-700 hover:bg-secondary-200"
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
