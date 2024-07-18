import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RequireAuth from "./components/Auth/RequireAuth";
import { addJob, deleteJob, editJob, jobLoader } from "./services/jobService";
import AuthLayout from "./layouts/AuthLayout";
import HomePage from "./pages/HomePage";
import JobsPage from "./pages/JobsPage";
import JobPage from "./pages/JobPage";
import AddJobPage from "./pages/AddJobPage";
import EditJobPage from "./pages/EditJobPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import UnauthorizedPage from "./pages/UnauthorizedPage";
import NotFoundPage from "./pages/NotFoundPage";
import { AxiosInterceptorProvider } from "./context/AxiosInterceptorContext.tsx";
import ErrorPage from "./pages/ErrorPage.tsx";
import PersistLogin from "./components/Auth/PersistLogin.tsx";
import LoadingLayout from "./layouts/LoadingLayout"; // Import the new LoadingLayout

const authenticatedRoutes = [
  {
    element: <RequireAuth allowedRoles={[1901, 2006]} />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "jobs", element: <JobsPage /> },
      {
        path: "jobs/:id",
        element: <JobPage deleteJob={deleteJob} />,
        loader: jobLoader,
        errorElement: <ErrorPage />,
      },
    ],
  },
  {
    element: <RequireAuth allowedRoles={[1901]} />,
    children: [
      { path: "add-job", element: <AddJobPage addJobSubmit={addJob} /> },
      {
        path: "jobs/edit/:id",
        element: <EditJobPage editJobSubmit={editJob} />,
        loader: jobLoader,
        errorElement: <ErrorPage />,
      },
    ],
  },
  { path: "unauthorized", element: <UnauthorizedPage /> },
];

const unauthenticatedRoutes = [
  { path: "login", element: <LoginPage /> },
  { path: "register", element: <RegisterPage /> },
];

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <PersistLogin>
        <AxiosInterceptorProvider>
          <LoadingLayout />
        </AxiosInterceptorProvider>
      </PersistLogin>
    ),
    children: authenticatedRoutes,
  },
  {
    path: "/auth",
    element: (
      <AxiosInterceptorProvider>
        <AuthLayout />
      </AxiosInterceptorProvider>
    ),
    children: unauthenticatedRoutes,
  },
  { path: "*", element: <NotFoundPage /> },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
