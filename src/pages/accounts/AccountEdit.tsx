import { useState } from "react";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../../components/ui/form";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "../../components/ui/toggle-group";
import { mapValidationErrors } from "../../utils/mapValidationErrors";
import { updateAccount } from "../../services/accountApi";
import { Account } from "../../types/account";

const FormSchema = z.object({
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
  role: z.enum(["USER", "ADMIN"], { message: "Role is required" }),
  avatarImage: z
    .any()
    .optional()
    .refine(
      (file) =>
        !file || (file.size <= 2 * 1024 * 1024 && /image\/.*/.test(file.type)),
      {
        message: "Image must be a valid format and less than 2MB.",
      },
    ),
});

function AccountEdit({
  userData,
  onFormSubmit,
}: {
  userData: Account;
  onFormSubmit: (newUser: Account) => void;
}) {
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [previewImage, setPreviewImage] = useState<string | null>(
    userData?.imageUrl ?? null,
  );

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      phoneNumber: userData.phoneNumber || "",
      role: userData.role as "USER" | "ADMIN",
      avatarImage: null,
    },
  });

  const handleUpdate = async (values: z.infer<typeof FormSchema>) => {
    const formData = new FormData();
    formData.append("id", userData.id);
    formData.append("firstName", values.firstName);
    formData.append("lastName", values.lastName);
    formData.append("email", values.email);
    formData.append("phoneNumber", values.phoneNumber || "");
    formData.append("role", values.role);

    if (values.avatarImage) formData.append("avatarImage", values.avatarImage);

    const res = await updateAccount(userData.id, formData);

    if (res.success) {
      onFormSubmit(res.data.user);
      toast.success("Account updated successfully.");
    } else {
      const fieldErrors = mapValidationErrors(res.errors);
      setErrors(fieldErrors);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];

      if (!allowedTypes.includes(file.type)) {
        toast.error("Please select a valid image file.");
        return;
      }

      //5 MB
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image size must be less than 5 MB.");
        return;
      }

      setPreviewImage(URL.createObjectURL(file));
      form.setValue("avatarImage", file);
    }
  };

  return (
    <div>
      <div>
        <h2 className="mb-5 text-2xl font-bold">Edit Account</h2>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleUpdate)}
            className="flex flex-col space-y-5"
          >
            <div className="flex items-center justify-center">
              <FormField
                control={form.control}
                name="avatarImage"
                render={({ field }) => (
                  <FormItem className="flex flex-col items-center">
                    <label className="text-sm font-medium">
                      Profile Picture
                    </label>
                    <FormControl>
                      <div
                        className={`mt-2 flex h-20 w-20 cursor-pointer items-center justify-center overflow-hidden rounded-full ${previewImage ? "border-0" : "border-2 border-dashed"} `}
                        onClick={() =>
                          document.getElementById("avatarInput")?.click()
                        }
                      >
                        {previewImage ? (
                          <img
                            src={previewImage}
                            alt="Preview"
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <span className="text-gray-400">+</span>
                        )}
                      </div>
                      {/* Move Input outside FormControl */}
                    </FormControl>
                    <Input
                      id="avatarInput"
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

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
            <Button
              type="submit"
              className="w-full rounded-full bg-primary-100 font-bold text-secondary-100 hover:bg-primary-200"
            >
              Save
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}

export default AccountEdit;
