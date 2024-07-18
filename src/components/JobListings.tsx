// JobListings.tsx
import { useEffect, useState } from "react";
import JobListing from "./JobListing";
import Spinner from "./Spinner";
import { fetchJobs } from "../services/jobService";
import axios from "axios";

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
    const controller = new AbortController();

    const getJobs = async () => {
      console.log("Fetching jobs...");
      setLoading(true);
      setError(null); // Reset error state before making a new request
      try {
        // Wait for 5 seconds before fetching the jobs
        // await new Promise((resolve) => setTimeout(resolve, 1000));
        const jobData = await fetchJobs(isHome, controller.signal);
        setJobs(jobData);
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log("Fetch canceled");
        } else {
          setError(
            "An error occurred while fetching jobs. Please try again later."
          );
        }
      } finally {
        setLoading(false);
      }
    };

    getJobs();

    return () => {
      controller.abort();
    };
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
            {jobs?.map((job) => (
              <JobListing key={job.id} job={job} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default JobListings;
