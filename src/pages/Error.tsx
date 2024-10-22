import { useRouteError } from "react-router-dom";

interface RouteError {
  status?: number;
  statusText?: string;
  message?: string;
}

function Error() {
  const error = useRouteError() as RouteError;
  console.error(error);

  return (
    <div>
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}

export default Error;
