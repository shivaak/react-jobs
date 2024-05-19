import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import HomePage from "./pages/HomePage";
import MainLayout from "./layouts/MainLayout";
import JobsPage from "./pages/JobsPage";
import NotFoundPage from "./pages/NotFoundPage";
import JobPage, { jobLoader } from "./pages/JobPage";
import AddJobPage from "./pages/AddJobPage";
import { Job } from "./types";
import EditJobPage from "./pages/EditJobPage";
import ErrorBoundary from "./pages/ErrorBoundary";

const App = () => {
  //Add a new job
  const addJob = async (job: Job) => {
    await fetch("/api/jobs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(job),
    });
    return;
  };

  // Delete a job
  const deleteJob = async (id: string) => {
    await fetch(`/api/jobs/${id}`, {
      method: "DELETE",
    });
    return;
  };

  // Edit a job
  const editJob = async (job: Job) => {
    const response = await fetch(`/api/jobs/${job.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(job),
    });
    console.log(response);
    return;
  };

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} errorElement={<ErrorBoundary />} />
        <Route
          path="/jobs"
          element={<JobsPage />}
          errorElement={<ErrorBoundary />}
        />
        <Route
          path="/jobs/:id"
          element={<JobPage deleteJob={deleteJob} />}
          loader={jobLoader}
          errorElement={<ErrorBoundary />}
        />
        <Route
          path="/add-job"
          element={<AddJobPage addJobSubmit={addJob} />}
          errorElement={<ErrorBoundary />}
        />
        <Route
          path="/jobs/edit/:id"
          element={<EditJobPage editJobSubmit={editJob} />}
          errorElement={<ErrorBoundary />}
          loader={jobLoader}
        />
        <Route
          path="*"
          element={<NotFoundPage />}
          errorElement={<ErrorBoundary />}
        />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
};

export default App;
