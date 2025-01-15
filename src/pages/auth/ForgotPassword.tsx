import { useState } from "react";
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
import Logo from "../../components/icons/Logo";
import { forgotPassword } from "../../services/authApi";
import { toast } from "sonner";
import { mapValidationErrors } from "../../utils/mapValidationErrors";

// Define form schema
const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
});

function ForgotPassword() {
  const navigate = useNavigate();
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Initialize form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const handleSubmitEmail = async (values: z.infer<typeof formSchema>) => {
    try {
      const res = await forgotPassword(values.email);
      if (!res.success) {
        const fieldErrors = mapValidationErrors(res.errors);
        setErrors(fieldErrors);
      } else {
        toast.custom(() => (
          <CustomToast type="success" message={res.data.message} />
        ));
        navigate("/verify-code", { state: { email: values.email } });
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
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
        <h1 className="text-xl font-bold">Forgot Password</h1>
        <p className="mb-3 text-sm text-secondary-800">
          Please enter your email to help you reset your password
        </p>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmitEmail)}
            className="space-y-5"
          >
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
            {errors && <FormMessage>{errors.email}</FormMessage>}
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

export default ForgotPassword;
