import { FaExclamationTriangle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const UnauthorizedPage = () => {
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };

  return (
    <section className="text-center flex flex-col justify-center items-center h-96">
      <FaExclamationTriangle className="text-yellow-400 text-6xl mb-4"></FaExclamationTriangle>
      <h1 className="text-6xl font-bold mb-4">403 Unauthorized</h1>
      <p className="text-xl mb-5">You do not have access to this page</p>
      {/* <Link
        to="/"
        className="text-white bg-indigo-700 hover:bg-indigo-900 rounded-md px-3 py-2 mt-4"
      >
        Go Back
      </Link>  */}

      <button
        onClick={goBack}
        className="text-white bg-indigo-700 hover:bg-indigo-900 rounded-md px-3 py-2 mt-4"
      >
        Go Back
      </button>
    </section>
  );
};

export default UnauthorizedPage;
