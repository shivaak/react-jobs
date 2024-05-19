import { Job } from "../types";

const API_URL = "/api/jobs";

// Function to add a new job
export const addJob = async (job: Job): Promise<void> => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(job),
  });

  if (!response.ok) {
    throw new Error("Failed to add job");
  }
};

// Function to delete a job
export const deleteJob = async (id: string): Promise<void> => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete job");
  }
};

// Function to get a job by ID
export const getJobById = async (id: string): Promise<Job> => {
  const response = await fetch(`${API_URL}/${id}`);

  if (!response.ok) {
    throw new Error("Failed to fetch job");
  }

  return response.json();
};

// Edit a job
export const editJob = async (job: Job) => {
  const response = await fetch(`/api/jobs/${job.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(job),
  });
  if (!response.ok) {
    throw new Error("Failed to fetch job");
  }

  return response.json();
};
