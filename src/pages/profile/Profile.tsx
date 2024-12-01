import { ArrowLeft, UserIcon } from "lucide-react";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Button } from "../../components/ui/button";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../hooks/use-user";
import { updateAccount } from "../../services/accountApi";
import React from "react";


function Profile() {
  const navigate = useNavigate();
  const { user } = useUser();
  const handleGoBack = () => {
    navigate(-1);
  };

  const [passForm, setpassForm] = React.useState({
    id: user?.id || "",
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    phoneNumber: user?.phoneNumber || "",
    role: user?.role || "",
    password: "",
    currentPassword: "",
  });
  const [form, setForm] = React.useState({
    id: user?.id || "",
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    phoneNumber: user?.phoneNumber || "",
    role: user?.role || "",
  });

  const handleChange = (e: { target: { id: any; value: any } }) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };
  

  const handleUpdateAccount = async () => {
    try {
      const id = user?.id as string;
      const response = await updateAccount(id, form);
      if (response.success) {
        alert("Profile updated successfully");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile");
    }
  };

  const handleChangePassword = async () => {
    try {
      const { password, currentPassword } = passForm;
      console.log(form)
      if (!currentPassword || !password) {
        alert("Please fill in both password fields.");
        return;
      }

      if (password.length < 8) {
        alert("The new password must be at least 8 characters long.");
        return;
      }
      
      const id = user?.id as string;
      const response = await updateAccount(id, passForm);
  
      if (response.success) {
        alert("Password updated successfully");
      } else {
        alert("Failed to update password");
      }
    } catch (error) {
      console.error("Error changing password:", error);
      alert("An unexpected error occurred while updating the password.");
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
      <div className="mt-3 flex flex-col justify-center gap-3 md:flex-row">
        <div className="flex flex-col items-center justify-center rounded-xl bg-secondary-100 p-5 md:justify-start">
          <div className="flex h-28 w-28 items-center justify-center rounded-full border border-solid border-secondary-600 bg-secondary-300 text-secondary-100">
            <UserIcon size={45} />
          </div>
          <button className="mx-auto block text-center">Upload</button>
        </div>
        <div className="w-full space-y-3">
          <div className="rounded-xl bg-secondary-100 px-10 py-5">
            <h2 className="mb-3 text-xl font-medium">Personal Information</h2>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              <div>
                <Label htmlFor="firstName">First name</Label>
                <Input
                  type="text"
                  id="firstName"
                  value={form.firstName}
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label htmlFor="lastName">Last name</Label>
                <Input
                  type="text"
                  id="lastName"
                  value={form.lastName}
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label htmlFor="email">Email address</Label>
                <Input
                  type="email"
                  id="email"
                  value={form.email}
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone number</Label>
                <Input
                  type="tel"
                  id="phoneNumber"
                  value={form.phoneNumber}
                  onChange={handleChange}
                />
              </div>
            </div>
            <Button
              onClick={handleUpdateAccount}
              className="mt-3 rounded-full bg-primary-100 px-10 text-secondary-900 hover:bg-primary-200"
            >
              Save
            </Button>
          </div>
          <div className="rounded-xl bg-secondary-100 px-10 py-5">
            <h2 className="mb-3 text-xl font-medium">Change password</h2>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              <div>
                <Label htmlFor="currentPassword">Current password</Label>
                <Input type="password" id="currentPassword" value={passForm.currentPassword} onChange={handleChange}/>
              </div>
              <div>
                <Label htmlFor="password">New password</Label>
                <Input type="password" id="password" value={passForm.password} onChange={handleChange}/>
              </div>
            </div>
            <Button
              onClick={handleChangePassword}
              className="mt-3 rounded-full bg-primary-100 px-10 text-secondary-900 hover:bg-primary-200"
            >
              Save
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;