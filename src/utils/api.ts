import axios, { AxiosError, AxiosResponse } from "axios";

export const api = axios.create({
  baseURL: "https://pre-onboarding-selection-task.shop",
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (res: AxiosResponse) => res,
  (error) => {
    if (error instanceof AxiosError) {
      let errorMessage = "something wrong from server";
      if (error && error.message) {
        errorMessage = error.message;
      }
      alert(errorMessage);
    }
  }
);
