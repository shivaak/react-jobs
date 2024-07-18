//useRefreshToken.ts
import { refreshToken } from "../services/userService";
import useAuth from "./useAuth";

const useRefreshToken = () => {
  const { setAuth } = useAuth();

  const refresh = async () => {
    try {
      const response = await refreshToken();
      const newAccessToken = response?.data?.token;
      const roles = response?.data?.roles;
      setAuth((prev) => {
        console.log("setting new access token ", newAccessToken);
        return {
          ...prev,
          roles: roles,
          accessToken: newAccessToken,
        };
      });
      return newAccessToken;
    } catch (error) {
      console.error("Failed to refresh token:", error);
      throw error;
    }
  };

  return refresh;
};

export default useRefreshToken;
