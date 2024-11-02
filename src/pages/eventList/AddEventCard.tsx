import { Plus } from "lucide-react";
import { Link } from "react-router-dom";

function AddEventCard() {
  return (
    <Link
      to={"/dashboard/create"}
      className="flex items-center justify-center rounded-lg bg-secondary-300"
    >
      <Plus className="text-secondary-800" />
    </Link>
  );
}

export default AddEventCard;
