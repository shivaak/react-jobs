import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/userService";
import { toast } from "react-toastify";

const schema = z
  .object({
    username: z
      .string()
      .min(4, "Username must be at least 4 characters long.")
      .max(20, "Username must be at most 20 characters long.")
      .regex(/^[a-zA-Z0-9]+$/, "Username must be alphanumeric."),
    password: z
      .string()
      .min(1, "Password is required.")
      .min(8, "Password must be at least 8 characters long."),
    confirmPassword: z.string().min(1, "Confirm Password is required."),
    firstName: z.string().min(1, "First name is required."),
    lastName: z.string().min(1, "Last name is required."),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Passwords do not match.",
        path: ["confirmPassword"],
      });
    }
  });

type FormData = z.infer<typeof schema>;

const RegisterPage = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setFocus,
    setError,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    setFocus("username");
  }, [setFocus]);

  const onSubmit = async (data: FormData) => {
    try {
      await registerUser(data);
      toast.success("User created successfully");
      navigate("/auth/login");
    } catch (error: any) {
      if (isErrorResponse(error)) {
        setErrorMessage(error.errorMessage || "Registration failed.");
        if (error.errors) {
          Object.keys(error.errors).forEach((field) => {
            setError(field as keyof FormData, {
              type: "server",
              message: error.errors[field],
            });
          });
        }
      } else {
        setErrorMessage("An unexpected error occurred.");
      }
    }
  };

  const isErrorResponse = (
    error: any
  ): error is { errorMessage: string; errors: Record<string, string> } => {
    return (
      error &&
      typeof error.errorMessage === "string" &&
      typeof error.errors === "object"
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-indigo-700">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
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
              {...register("username")}
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                errors.username ? "border-red-500" : ""
              }`}
            />
            {errors.username && (
              <p className="text-red-500 text-xs mt-1">
                {errors.username.message}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-700 font-bold mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              {...register("password")}
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                errors.password ? "border-red-500" : ""
              }`}
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">
                {errors.password.message}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="confirmPassword"
              className="block text-gray-700 font-bold mb-2"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              {...register("confirmPassword")}
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                errors.confirmPassword ? "border-red-500" : ""
              }`}
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-xs mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="firstName"
              className="block text-gray-700 font-bold mb-2"
            >
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              {...register("firstName")}
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                errors.firstName ? "border-red-500" : ""
              }`}
            />
            {errors.firstName && (
              <p className="text-red-500 text-xs mt-1">
                {errors.firstName.message}
              </p>
            )}
          </div>
          <div className="mb-6">
            <label
              htmlFor="lastName"
              className="block text-gray-700 font-bold mb-2"
            >
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              {...register("lastName")}
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                errors.lastName ? "border-red-500" : ""
              }`}
            />
            {errors.lastName && (
              <p className="text-red-500 text-xs mt-1">
                {errors.lastName.message}
              </p>
            )}
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Register
            </button>
            <button
              type="button"
              className="text-indigo-500 hover:text-indigo-600 text-sm"
              onClick={() => navigate("/auth/login")}
            >
              Back to Login
            </button>
          </div>
          {errorMessage && !Object.keys(errors).length && (
            <div className="mt-4 text-red-500 text-sm text-center">
              {errorMessage}
            </div>
          )}
          {successMessage && (
            <div className="mt-4 text-green-500 text-sm text-center">
              {successMessage}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
