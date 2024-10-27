import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

function Overview() {
  const userContext = useContext(UserContext);
  if (!userContext) {
    return <div>Loading...</div>;
  }
  const { user } = userContext;

  return (
    <div>
      <h1>Overview</h1>
      <h1>{user?.firstName}</h1>
    </div>
  );
}

export default Overview;
