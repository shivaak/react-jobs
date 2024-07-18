import { useEffect, useState } from "react";
import MainLayout from "./MainLayout";
import Spinner from "../components/Spinner";

const LoadingLayout = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return loading ? <Spinner loading={loading} /> : <MainLayout />;
};

export default LoadingLayout;
