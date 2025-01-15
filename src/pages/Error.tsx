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
    <div className="flex h-screen flex-col items-center justify-center">
      <h1 className="text-2xl font-bold">Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      {/* <p>
        <i>{error.statusText || error.message}</i>
      </p> */}
    </div>
  );
}

export default Error;
