import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

import { Check, Info, X } from "lucide-react";
import { toast } from "sonner";

interface CustomToastProps {
  type: "info" | "success" | "error" | "warning";
  message: string;
}

const CustomToast = ({ type, message }: CustomToastProps) => {
  const textColorMapping = {
    info: "text-blue-700",
    success: "text-green-800",
    error: "text-red-700",
    warning: "text-yellow-700",
  };

  const iconMapping = {
    info: <Info />,
    success: <Check />,
    error: <X />,
    warning: <ExclamationTriangleIcon />,
  };

  const bgColorMapping = {
    info: "bg-blue-800/20",
    success: "bg-primary-100/50",
    error: "bg-red-800/20",
    warning: "bg-yellow-800/20",
  };

  return (
    <div
      className={`flex w-80 items-center justify-between rounded-lg ${bgColorMapping[type]} p-3 ${textColorMapping[type]} shadow-md`}
    >
      <div className="flex items-center">
        <div className={` ${textColorMapping[type]}`}>
          {iconMapping[type]} {/* Display the icon based on the type */}
        </div>
        <p className="ml-3 font-semibold">{message}</p>{" "}
        {/* Display the message */}
      </div>
      <button
        onClick={() => toast.dismiss()}
        className="cursor-pointer border-none bg-transparent"
      >
        <X size={"15px"} />
      </button>
    </div>
  );
};

export default CustomToast;
