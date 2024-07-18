// src/pages/ErrorPage.tsx
import { useRouteError, isRouteErrorResponse } from "react-router-dom";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();

  return (
    <div className="container m-auto py-10 px-6 text-center">
      <h1 className="text-3xl font-bold mb-4">Unexpected Application Error!</h1>
      {isRouteErrorResponse(error) ? (
        <p>{error.statusText || error.data.message}</p>
      ) : (
        <p>{(error as Error).message}</p>
      )}
      <div className="mt-6">
        <Link
          to="/jobs"
          className="text-indigo-500 hover:text-indigo-600 flex items-center justify-center"
        >
          Back to Job Listings
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
