//PersistLogin.tsx

import { ReactNode, useEffect, useState } from "react";
import useRefreshToken from "../../hooks/useRefreshToken";
import useAuth from "../../hooks/useAuth";
import { Outlet } from "react-router-dom";
import Spinner from "../Spinner";

const PersistLogin = ({ children }: { children: ReactNode }) => {
  const [isLoading, setIsLoading] = useState(true);
  const refresh = useRefreshToken();
  const { auth } = useAuth();

  useEffect(() => {
    const verifyRefreshToken = async () => {
      try {
        console.log("Verifying refresh token...");
        await refresh();
      } catch (error) {
        console.error("Failed to verify refresh token:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (!auth?.accessToken) {
      verifyRefreshToken();
    } else {
      setIsLoading(false);
    }
  }, [auth?.accessToken, refresh]);
  return isLoading ? <Spinner loading={isLoading} /> : children || <Outlet />;
};

export default PersistLogin;
