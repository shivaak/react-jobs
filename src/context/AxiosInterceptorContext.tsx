// src/context/AxiosInterceptorContext.tsx
import { createContext, useContext, useEffect, ReactNode } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axiosPrivateInstance from "../api/axiosPrivateInstance";
import useRefreshToken from "../hooks/useRefreshToken";
import useAuth from "../hooks/useAuth";

const AxiosInterceptorContext = createContext({});

export const AxiosInterceptorProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const refresh = useRefreshToken();
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!auth) return;
    console.log("AxiosInterceptorProvider called");

    const requestIntercept = axiosPrivateInstance.interceptors.request.use(
      (config) => {
        console.log("Request interceptor called");
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${auth?.accessToken}`;
          console.log(
            "Auth token set in request interceptor : ",
            auth?.accessToken
          );
        }
        return config;
      },
      (error) => {
        console.log("Request interceptor error: ", error);
        Promise.reject(error);
      }
    );

    const responseIntercept = axiosPrivateInstance.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;
        if (error?.response?.status === 403 && !prevRequest?.sent) {
          prevRequest.sent = true;
          try {
            const newAccessToken = await refresh();
            console.log("Refresh completed");
            console.log(auth);
            console.log("newAccessToken", newAccessToken);

            prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
            return axiosPrivateInstance(prevRequest);
          } catch (refreshError) {
            console.log("Refresh token failed:", refreshError);
            alert(
              "Your session has timed out. You will be redirected to the login page."
            );
            setAuth(null);
            navigate("/auth/login", {
              state: { from: location },
              replace: true,
            });
            return Promise.reject(refreshError);
          }
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosPrivateInstance.interceptors.request.eject(requestIntercept);
      axiosPrivateInstance.interceptors.response.eject(responseIntercept);
    };
  }, [auth]);

  return (
    <AxiosInterceptorContext.Provider value={{}}>
      {children}
    </AxiosInterceptorContext.Provider>
  );
};

export const useAxiosInterceptor = () => {
  return useContext(AxiosInterceptorContext);
};
