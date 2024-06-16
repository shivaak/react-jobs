import { useEffect, useState } from "react";
import axios from "axios";
import JobListing from "./JobListing";
import Spinner from "./Spinner";

interface Props {
  isHome?: boolean;
}

interface Job {
  id: string;
  title: string;
  type: string;
  description: string;
  location: string;
  salary: string;
  company: {
    name: string;
    description: string;
    contactEmail: string;
    contactPhone: string;
  };
}

const JobListings = ({ isHome = false }: Props) => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const apiUrl = isHome ? "/api/jobs?_limit=3" : "/api/jobs";

    const fetchJobs = async () => {
      setLoading(true);
      setError(null); // Reset error state before making a new request
      try {
        const response = await axios.get(apiUrl);
        setJobs(response.data);
      } catch (error) {
        setError(
          "An error occurred while fetching jobs. Please try again later."
        );
        // Optionally log the error to an external service like Sentry
        // Sentry.captureException(error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [isHome]);

  return (
    <section className="bg-blue-50 px-4 py-10">
      <div className="container-xl lg:container m-auto">
        <h2 className="text-3xl font-bold text-indigo-500 mb-6 text-center">
          {isHome ? "Recent Jobs" : "Browse Jobs"}
        </h2>

        {loading ? (
          <Spinner loading={loading} />
        ) : error ? (
          <div className="text-red-500 text-center">{error}</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {jobs.map((job) => (
              <JobListing key={job.id} job={job} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default JobListings;
