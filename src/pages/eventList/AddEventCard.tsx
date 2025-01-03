import { Plus } from "lucide-react";
import { Link } from "react-router-dom";

function AddEventCard() {
  return (
    <Link
      to={"/dashboard/create/select-venue"}
      className="flex h-auto min-h-[22.5rem] items-center justify-center rounded-lg bg-secondary-300 transition-all duration-200 ease-in-out hover:bg-secondary-600/50"
    >
      <Plus className="text-secondary-800" />
    </Link>
  );
}

export default AddEventCard;
