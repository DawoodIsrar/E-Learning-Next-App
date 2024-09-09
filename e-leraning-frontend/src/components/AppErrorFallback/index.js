"use client";

import ErrorPage from "../ErrorPage";
import { useRouter } from "next/navigation";

const AppErrorFallback = ({ resetErrorBoundary = () => {} }) => {
  const router = useRouter();
  return (
    <ErrorPage
      title={"Something went wrong"}
      subTitle={`Click "Reload the Page" button to return to the page you were on previously.`}
      handleBack={() => {
        resetErrorBoundary();
        router.back();
      }}
      buttonText="Reload the Page"
    />
  );
};

export default AppErrorFallback;
