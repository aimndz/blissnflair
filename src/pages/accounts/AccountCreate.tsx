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
import { ToggleGroup, ToggleGroupItem } from "../../components/ui/toggle-group";
import { mapValidationErrors } from "../../utils/mapValidationErrors";
import { createAccount } from "../../services/accountApi";
import { ArrowLeft } from "lucide-react";

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
    phoneNumber: z
      .string()
      .optional()
      .refine((value) => !value || /^\+639\d{9}$/.test(value), {
        message: "Invalid phone number format. Use +639XXXXXXXXX.",
      }),
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
    role: z.enum(["USER", "ADMIN"], { message: "Role is required" }),
  })
  .refine((data) => data.confirmPassword === data.password, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

function AccountCreate() {
  const navigate = useNavigate();
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      password: "",
      confirmPassword: "",
      role: "USER", // Default to "user"
    },
  });

  const handleSignUp = async (values: z.infer<typeof FormSchema>) => {
    console.log(values);
    const res = await createAccount(values);

    if (!res.success) {
      const fieldErrors = mapValidationErrors(res.errors);
      setErrors(fieldErrors);
    } else {
      navigate("/admin/dashboard/accounts");
    }
  };

  const handleGoBack = () => {
    navigate("/admin/dashboard/accounts");
  };

  return (
    <div className="flex h-[calc(100vh-150px)] flex-col items-center justify-center">
      <div className="-mt-16 w-full max-w-lg">
        <Button
          className="bg-transparent px-0 text-secondary-900 shadow-none hover:bg-transparent hover:text-secondary-800"
          onClick={handleGoBack}
        >
          <ArrowLeft />
          <span>Back</span>
        </Button>
        <div className="rounded-lg border border-secondary-600 bg-secondary-100 p-5">
          <h2 className="mb-5 text-2xl font-bold">Create Account</h2>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSignUp)}
              className="space-y-5"
            >
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <label className="text-sm font-medium">
                      Select User Role
                    </label>
                    <ToggleGroup
                      type="single"
                      defaultValue="user"
                      value={field.value}
                      onValueChange={(value: string) => field.onChange(value)}
                      className="mt-2 flex gap-2"
                    >
                      <ToggleGroupItem
                        value="USER"
                        className={`w-full rounded border py-2 text-center ${
                          field.value === "USER"
                            ? "bg-secondary-100 text-white"
                            : "text-black"
                        }`}
                      >
                        User
                      </ToggleGroupItem>
                      <ToggleGroupItem
                        value="ADMIN"
                        className={`w-full rounded border py-2 text-center ${
                          field.value === "ADMIN"
                            ? "bg-secondary-100 text-white"
                            : "text-black"
                        }`}
                      >
                        Admin
                      </ToggleGroupItem>
                    </ToggleGroup>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
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
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="tel"
                        placeholder="Phone number (e.g., +639XXXXXXXXX)"
                        {...field}
                      />
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
                      <Input
                        type="password"
                        placeholder="Password"
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
                        placeholder="Confirm password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="w-full rounded-full bg-primary-100 font-bold text-secondary-900 hover:bg-primary-200"
              >
                Sign up
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default AccountCreate;
