export interface ErrorResponse {
  errorCode: string;
  errorMessage: string;
  errors: null | Record<string, any>;
}

export interface Company {
  name: string;
  description: string;
  contactEmail: string;
  contactPhone: string;
}

export interface Job {
  id?: string;
  title: string;
  type: string;
  description: string;
  location: string;
  salary: string;
  company: Company;
}

export interface UserData {
  username: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
}

export interface Login {
  username: string;
  password: string;
}
