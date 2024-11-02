import { Link } from "react-router-dom";
import { Button } from "../../components/ui/button";

function NoEventsMessage({ message }: { message: string }) {
  return (
    <div className="flex h-[calc(100vh-10rem)] flex-col items-center justify-center">
      <p className="text-2xl font-medium">{message}</p>
      <Link to={"/dashboard/create"}>
        <Button className="mt-3 bg-primary-100 text-secondary-900 hover:bg-primary-200">
          Add Event
        </Button>
      </Link>
    </div>
  );
}

export default NoEventsMessage;
