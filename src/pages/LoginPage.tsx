import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { login } from "../services/userService";
import useAuth from "../hooks/useAuth";

const LoginPage = () => {
  const { auth, setAuth, persist, setPersist } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{
    username?: string;
    password?: string;
  }>({});
  const [serverError, setServerError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: { username?: string; password?: string } = {};

    if (!/^[a-zA-Z0-9]+$/.test(username)) {
      newErrors.username = "Username must be alphanumeric.";
    }
    if (username === "") {
      newErrors.username = "Username is required.";
    }
    if (password === "") {
      newErrors.password = "Password is required.";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        setIsLoading(true);
        const response = await login({ username, password });

        const accessToken = response?.data?.token;
        const roles = response?.data?.roles;
        setAuth({ roles, accessToken });

        toast.success("Login successful!");

        navigate(from, { replace: true });
      } catch (error: unknown) {
        setIsLoading(false);
        if (error instanceof Error) {
          setServerError(error.message);
        } else {
          setServerError("An unexpected error occurred.");
        }
        toast.error("Login failed.");
      }
    } else {
      toast.error("Please correct the errors.");
    }
  };

  const togglePersist = () => {
    setPersist((prev) => !prev);
  };

  useEffect(() => {
    localStorage.setItem("persist", JSON.stringify(persist));
  }, [persist]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 to-purple-500">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-900">
          Login
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-gray-700 font-bold mb-2"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                errors.username ? "border-red-500" : ""
              }`}
              disabled={isLoading}
            />
            {errors.username && (
              <p className="text-red-500 text-xs mt-1">{errors.username}</p>
            )}
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-gray-700 font-bold mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                errors.password ? "border-red-500" : ""
              }`}
              disabled={isLoading}
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password}</p>
            )}
          </div>
          {!isLoading && serverError && (
            <p className="text-red-500 text-sm mt-1 text-center">
              {serverError}
            </p>
          )}
          <div className="flex items-center justify-between mb-4">
            <button
              type="submit"
              disabled={auth?.accessToken !== undefined || isLoading}
              className={`font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
                isLoading
                  ? "bg-gray-400 text-white cursor-not-allowed"
                  : "bg-indigo-600 hover:bg-indigo-700 text-white"
              }`}
            >
              {isLoading ? "Logging in..." : "Login"}
            </button>
            {!isLoading && (
              <button
                type="button"
                disabled={auth?.accessToken !== undefined}
                className="text-indigo-500 hover:text-indigo-600 text-sm"
                onClick={() => navigate("/auth/register")}
              >
                Sign up
              </button>
            )}
          </div>
          <div className="mb-4 flex items-center">
            <input
              type="checkbox"
              id="trustDevice"
              checked={persist}
              onChange={togglePersist}
              className="mr-2 leading-tight"
            />
            <label htmlFor="trustDevice" className="text-gray-700">
              Trust this device
            </label>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
