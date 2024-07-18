// setupAxiosInterceptors.ts
import axiosPrivateInstance from "../api/axiosPrivateInstance";
import useRefreshToken from "../hooks/useRefreshToken";
import useAuth from "../hooks/useAuth";
import { useNavigate, useLocation } from "react-router-dom";

const setupAxiosInterceptors = () => {
  const refresh = useRefreshToken();
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const requestIntercept = axiosPrivateInstance.interceptors.request.use(
    (config) => {
      if (!config.headers["Authorization"]) {
        config.headers["Authorization"] = `Bearer ${auth?.accessToken}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  const responseIntercept = axiosPrivateInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const prevRequest = error?.config;
      if (error?.response?.status === 403 && !prevRequest?.sent) {
        prevRequest.sent = true;
        try {
          const newAccessToken = await refresh();
          prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
          return axiosPrivateInstance(prevRequest);
        } catch (refreshError) {
          setAuth(null);
          navigate("/login", { state: { from: location }, replace: true });
          return Promise.reject(refreshError);
        }
      }
      return Promise.reject(error);
    }
  );

  return { requestIntercept, responseIntercept };
};

export default setupAxiosInterceptors;
