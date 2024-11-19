import { ArrowLeft, UserIcon } from "lucide-react";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Button } from "../../components/ui/button";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../hooks/use-user";

function Profile() {
  const navigate = useNavigate();
  const { user } = useUser();

  const handleGoBack = () => {
    navigate(-1);
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
                  type="firstName"
                  id="firstName"
                  value={user?.firstName}
                />
              </div>
              <div>
                <Label htmlFor="lastName">Last name</Label>
                <Input type="lastName" id="lastName" value={user?.lastName} />
              </div>
              <div>
                <Label htmlFor="email">Email address</Label>
                <Input type="email" id="email" value={user?.email} />
              </div>
              <div>
                <Label htmlFor="phone">Phone number</Label>
                <Input type="phone" id="phone" value={user?.phoneNumber} />
              </div>
            </div>
            <Button
              // onClick={handleEventSubmit}
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
                <Input type="currentPassword" id="currentPassword" />
              </div>
              <div>
                <Label htmlFor="password">New password</Label>
                <Input type="password" id="password" />
              </div>
            </div>
            <Button
              // onClick={handleEventSubmit}
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
