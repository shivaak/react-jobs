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
import EditJobPage from "./pages/EditJobPage";
import ErrorBoundary from "./pages/ErrorBoundary";
import { addJob, deleteJob, editJob } from "./services/jobService";

const App = () => {
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
