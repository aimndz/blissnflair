import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
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
import Logo from "../../components/icons/Logo";
import { resetPassword } from "../../services/authApi";
import { toast } from "sonner";

// Define form schema
const formSchema = z
  .object({
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

function ChangePassword() {
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState("");

  const email = location.state?.email;

  // Initialize form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const handleSubmitEmail = async (values: z.infer<typeof formSchema>) => {
    try {
      const res = await resetPassword(email, values.password);

      if (!res.success) {
        setError(res.data.message);
      } else {
        toast.success(res.data.message);
        navigate("/login");
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
        <Link to="/">
          <div className="mx-auto flex w-10 justify-center">
            <Logo />
          </div>
          <div className="mb-6 text-2xl font-bold">
            <span>BLISS & FLAIR</span>
          </div>
        </Link>
        <h1 className="text-xl font-bold">Change Password</h1>
        <p className="mb-6 text-sm text-secondary-800">
          Please enter your new password
        </p>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmitEmail)}
            className="space-y-5"
          >
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="New Password"
                      {...field}
                    />
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
                      placeholder="Confirm Password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {error && <FormMessage>{error}</FormMessage>}
            <Button
              type="submit"
              className="w-full rounded-full bg-primary-100 font-bold text-secondary-900 hover:bg-primary-200"
            >
              Submit
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}

export default ChangePassword;
