import { useEffect, useState } from "react";
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

  useEffect(() => {
    const apiUrl = isHome
      ? "http://localhost:8000/jobs?_limit=3"
      : "http://localhost:8000/jobs";
    const fetchJobs = async () => {
      try {
        setLoading(true);
        const response = await fetch(apiUrl);
        const data = await response.json();
        setJobs(data);
      } catch (error) {
        console.log("Error fetching jobs", error);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  return (
    <section className="bg-blue-50 px-4 py-10">
      <div className="container-xl lg:container m-auto">
        <h2 className="text-3xl font-bold text-indigo-500 mb-6 text-center">
          {isHome ? "Recent Jobs" : "Browse Jobs"}
        </h2>

        {loading ? (
          <Spinner loading={loading} />
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {jobs.map((job) => (
                <JobListing key={job.id} job={job} />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default JobListings;
