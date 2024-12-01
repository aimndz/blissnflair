import { Plus } from "lucide-react";
import { Link } from "react-router-dom";

function AddEventCard() {
  return (
    <Link
      to={"/dashboard/create/select-venue"}
      className="flex h-48 items-center justify-center rounded-lg bg-secondary-300"
    >
      <Plus className="text-secondary-800" />
    </Link>
  );
}

export default AddEventCard;
