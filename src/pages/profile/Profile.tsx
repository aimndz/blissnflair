import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../components/ui/form";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../hooks/use-user";
import { updateAccount } from "../../services/accountApi";
import { ArrowLeft, UserIcon } from "lucide-react";
import { useState } from "react";
import CustomToast from "../../components/toasts/CustomToast";

const formSchema = z.object({
  firstName: z.string().min(1, { message: "First name is required." }),
  lastName: z.string().min(1, { message: "Last name is required." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phoneNumber: z
    .string()
    .optional()
    .refine((value) => !value || /^\+639\d{9}$/.test(value), {
      message: "Invalid phone number format. Use +639XXXXXXXXX.",
    }),
  eventImage: z
    .any()
    .refine(
      (file) =>
        !file || (file instanceof File && file.type.startsWith("image/")),
      {
        message: "File must be a valid image",
      },
    )
    .refine(
      (file) => !file || (file.size > 0 && file.size <= 5 * 1024 * 1024),
      {
        message: "File size must be less than 5 MB",
      },
    ),
});

const passwordSchema = z.object({
  currentPassword: z
    .string()
    .min(8, { message: "Current password must be at least 8 characters." }),
  password: z
    .string()
    .min(8, { message: "New password must be at least 8 characters." }),
});

export function Profile() {
  const navigate = useNavigate();
  const { user, setUser } = useUser();
  const [avatarPreview, setAvatarPreview] = useState<string | null>(
    user?.imageUrl || null,
  );
  const [selectedAvatar, setSelectedAvatar] = useState<File | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      email: user?.email || "",
      phoneNumber: user?.phoneNumber || "",
      eventImage: undefined,
    },
  });

  const passwordForm = useForm<z.infer<typeof passwordSchema>>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      currentPassword: "",
      password: "",
    },
  });

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
      if (!allowedTypes.includes(file.type)) {
        toast.custom(() => (
          <CustomToast
            type="error"
            message={"Please select a valid image file"}
          />
        ));
        return;
      }

      //5 MB
      if (file.size > 5 * 1024 * 1024) {
        toast.custom(() => (
          <CustomToast
            type="error"
            message={"Image size must be less than 5 MB"}
          />
        ));
        return;
      }

      setSelectedAvatar(file);
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleUpdateAccount = async (values: z.infer<typeof formSchema>) => {
    try {
      const formData = new FormData();
      formData.append("id", user?.id as string);
      formData.append("role", user?.role as string);
      formData.append("firstName", values.firstName);
      formData.append("lastName", values.lastName);
      formData.append("email", values.email);
      formData.append("phoneNumber", values.phoneNumber || "");

      if (selectedAvatar) {
        formData.append("avatarImage", selectedAvatar);
      }

      const res = await updateAccount(user?.id as string, formData);

      if (!res.success) {
        res.errors.forEach((error: { path: string; msg: string }) => {
          form.setError(error.path as keyof z.infer<typeof formSchema>, {
            type: "server",
            message: error.msg,
          });
        });
        return;
      }

      const updatedUser = res.data.user;
      setUser(updatedUser);

      toast.custom(() => (
        <CustomToast type="success" message="User updated successfully" />
      ));
    } catch (error) {
      console.error("Error updating profile:", error);
      form.setError("root", {
        type: "server",
        message: "An unexpected error occurred.",
      });
    }
  };

  const handleChangePassword = async (
    values: z.infer<typeof passwordSchema>,
  ) => {
    try {
      const formData = new FormData();
      formData.append("id", user?.id as string);
      formData.append("firstName", user?.firstName || "");
      formData.append("lastName", user?.lastName || "");
      formData.append("email", user?.email || "");
      formData.append("phoneNumber", user?.phoneNumber || "");
      formData.append("role", user?.role || "");
      formData.append("imageUrl", user?.imageUrl || "");
      formData.append("currentPassword", values.currentPassword);
      formData.append("password", values.password);

      const res = await updateAccount(user?.id as string, formData);

      if (!res.success) {
        res.errors.forEach((error: { path: string; msg: string }) => {
          if (
            passwordForm.getFieldState(
              error.path as keyof z.infer<typeof passwordSchema>,
            )
          ) {
            passwordForm.setError(
              error.path as keyof z.infer<typeof passwordSchema>,
              {
                type: "server",
                message: error.msg,
              },
            );
          } else {
            form.setError(error.path as keyof z.infer<typeof formSchema>, {
              type: "server",
              message: error.msg,
            });
          }
        });
        return;
      }

      const updatedUser = res.data.user;
      setUser(updatedUser);

      toast.custom(() => (
        <CustomToast type="success" message="Password updated successfully" />
      ));
    } catch (error) {
      console.error("Error updating password:", error);
      passwordForm.setError("root", {
        type: "server",
        message: "An unexpected error occurred.",
      });
    }
  };

  return (
    <div className="mx-auto w-full max-w-5xl">
      <Button
        className="bg-transparent px-0 text-secondary-900 shadow-none hover:bg-transparent hover:text-secondary-800"
        onClick={handleGoBack}
      >
        <ArrowLeft />
        <span>Back</span>
      </Button>
      <div className="relative mt-3 flex flex-col justify-center gap-3 md:flex-row">
        <div className="flex flex-col items-center justify-center rounded-xl p-5 md:justify-start">
          <label
            htmlFor="avatar-upload"
            className="flex h-48 w-48 cursor-pointer items-center justify-center overflow-hidden rounded-full border border-solid border-secondary-600 bg-secondary-300 text-secondary-100"
          >
            {avatarPreview ? (
              <img
                src={avatarPreview}
                alt="Avatar Preview"
                className="h-full w-full object-cover"
              />
            ) : (
              <UserIcon size={45} />
            )}
          </label>
          <input
            id="avatar-upload"
            type="file"
            accept="image/jpeg, image/png, image/jpg"
            className="hidden"
            onChange={handleAvatarChange}
          />
        </div>
        <div className="w-full space-y-3">
          <div className="rounded-xl bg-secondary-100 px-10 py-5">
            <h2 className="mb-3 text-xl font-medium">Personal Information</h2>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleUpdateAccount)}>
                <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>First Name</FormLabel>
                        <FormControl>
                          <Input placeholder="First Name" {...field} />
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
                        <FormLabel>Last Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Last Name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="Email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phoneNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input placeholder="Phone Number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="mt-3 flex justify-end">
                  <Button
                    type="submit"
                    className="rounded-full bg-primary-100 px-10 text-secondary-900 hover:bg-primary-200"
                  >
                    Save
                  </Button>
                </div>
              </form>
            </Form>
          </div>

          <div className="rounded-xl bg-secondary-100 px-10 py-5">
            <h2 className="mb-3 text-xl font-medium">Change Password</h2>
            <Form {...passwordForm}>
              <form onSubmit={passwordForm.handleSubmit(handleChangePassword)}>
                <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                  <FormField
                    control={passwordForm.control}
                    name="currentPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Current Password</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="Current Password"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={passwordForm.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>New Password</FormLabel>
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
                </div>
                <div className="mt-3 flex justify-end">
                  <Button
                    type="submit"
                    className="mt-3 rounded-full bg-primary-100 px-10 text-secondary-900 hover:bg-primary-200"
                  >
                    Save
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
