import { useLocation } from "react-router-dom";
import VenueInfo from "./VenueInfo";
import PrivateRoomInfo from "./PrivateRoomInfo";

function Create() {
  const location = useLocation();
  const { spaceName } = location.state || {};

  return (
    <div className="mx-auto mb-10 max-w-2xl rounded-lg border border-secondary-600 bg-secondary-100 p-5 shadow-lg">
      {spaceName === "private room" ? <PrivateRoomInfo /> : <VenueInfo />}
    </div>
  );
}

export default Create;
