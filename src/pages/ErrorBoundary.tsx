import { FaExclamationCircle } from "react-icons/fa";
import { Link, useRouteError } from "react-router-dom";

const ErrorBoundary = () => {
  const error = useRouteError();
  console.error(error);

  return (
    <section className="text-center flex flex-col justify-center items-center h-96">
      <FaExclamationCircle className="text-yellow-400 text-6xl mb-4"></FaExclamationCircle>
      <h1 className="text-3xl font-bold mb-4">Oops! Something went wrong.</h1>
      <p className="text-xl mb-5">
        We're sorry, but an unexpected error has occurred.
      </p>
      {error instanceof Error && (
        <p className="text-base mb-2">{error.message}</p>
      )}
      <Link
        to="/"
        className="text-white bg-indigo-700 hover:bg-indigo-900 rounded-md px-3 py-2 mt-4"
      >
        Go Back
      </Link>
    </section>
  );
};

export default ErrorBoundary;
