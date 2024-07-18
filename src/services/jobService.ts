// jobService.ts
import { LoaderFunctionArgs } from "react-router-dom";
import axiosPrivateInstance from "../api/axiosPrivateInstance";
import { Job } from "../types";

const API_URL = "/jobs";

// Function to fetch jobs
export const fetchJobs = async (isHome: boolean, signal: AbortSignal) => {
  const response = await axiosPrivateInstance.get(
    `${API_URL}${isHome ? `?_limit=3` : ""}`,
    { signal }
  );
  return response.data;
};

// Function to add a new job
export const addJob = async (job: Job): Promise<boolean> => {
  try {
    await axiosPrivateInstance.post(API_URL, job);
    return true;
  } catch (error) {
    console.error("Failed to add job:", error);
    return false;
  }
};

// Function to delete a job
export const deleteJob = async (id: string): Promise<boolean> => {
  try {
    await axiosPrivateInstance.delete(`${API_URL}/${id}`);
    return true;
  } catch (error) {
    console.error("Failed to delete job:", error);
    return false;
  }
};

// Function to get a job by ID
export const getJobById = async (id: string): Promise<Job> => {
  try {
    const response = await axiosPrivateInstance.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch job");
  }
};

// Function to edit a job
export const editJob = async (job: Job): Promise<boolean> => {
  try {
    await axiosPrivateInstance.put(`${API_URL}/${job.id}`, job);
    return true;
  } catch (error) {
    console.error("Failed to edit job:", error);
    return false;
  }
};

export const jobLoader = async ({ params }: LoaderFunctionArgs) => {
  console.log("jobLoader called with params:", params); // Ensure this log is here
  if (!params.id) {
    throw new Error("Job ID is required");
  }
  const job = await getJobById(params.id);
  console.log("job fetched:", job); // Ensure this log is here
  return job;
};
