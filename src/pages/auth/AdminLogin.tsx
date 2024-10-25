import { useState } from "react";
import { login } from "../../services/authApi";
import { useNavigate } from "react-router-dom";
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

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 8 characters" }),
});

function Login() {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleLogin = async (values: z.infer<typeof formSchema>) => {
    try {
      const res = await login({
        email: values.email,
        password: values.password,
      });
      console.log(res);
      navigate("/dashboard");
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
        <h1 className="text-xl font-bold">Admin Login</h1>
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
            <Button
              type="submit"
              className="hover:bg-primary-200 w-full rounded-full bg-primary-100 font-bold text-secondary-900"
            >
              Login
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}

export default Login;
