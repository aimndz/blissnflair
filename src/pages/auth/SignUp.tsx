import { useState } from "react";
import { signUp } from "../../services/authApi";
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
import { mapValidationErrors } from "../../utils/mapValidationErrors";

const FormSchema = z
  .object({
    firstName: z
      .string()
      .min(1, { message: "First name is required" })
      .max(35, { message: "First name must be less than 35 characters" }),
    lastName: z
      .string()
      .min(1, { message: "Last name is required" })
      .max(35, { message: "Last name must be less than 35 characters" }),
    email: z.string().email({ message: "Please enter a valid email address" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" })
      .regex(/\d/, { message: "Password must contain a number" })
      .regex(/[a-zA-Z]/, { message: "Password must contain a letter" })
      .regex(/[!@#$%^&*(),.?":{}|<>]/, {
        message: "Password must contain a special character",
      }),
    confirmPassword: z
      .string()
      .min(1, { message: "Confirm password is required" }),
  })
  .refine((data) => data.confirmPassword === data.password, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

function SignUp() {
  const navigate = useNavigate();
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const handleSignUp = async (values: z.infer<typeof FormSchema>) => {
    const res = await signUp({
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      password: values.password,
      confirmPassword: values.confirmPassword,
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
    <div className="flex h-screen flex-col justify-center text-center">
      <div className="mx-auto w-full max-w-md rounded-xl border border-solid border-secondary-600 bg-secondary-100 p-8 shadow-xl">
        <h1 className="text-xl font-bold">Sign up</h1>
        <p className="mb-8 text-sm text-secondary-800">
          Welcome! Please fill in the details
        </p>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSignUp)}
            className="space-y-5"
          >
            <div className="flex flex-col gap-5 md:flex-row">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="First name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Last name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Email" {...field} />
                  </FormControl>
                  <FormMessage />
                  {errors.email && <FormMessage>{errors.email}</FormMessage>}
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
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Confirm password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="text-right">
              <Link to="" className="text-sm text-secondary-800 underline">
                Forgot password?
              </Link>
            </div>
            <Button
              type="submit"
              className="w-full rounded-full bg-primary-100 font-bold text-secondary-900 hover:bg-primary-200"
            >
              Sign up
            </Button>
            <div className="mt-5">
              <Link
                to="/login"
                className="text-sm text-secondary-800 hover:underline"
              >
                Already have an account?{" "}
                <span className="font-semibold">Login</span>
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

export default SignUp;
