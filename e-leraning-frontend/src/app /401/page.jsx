import ErrorPage from "@/components/ErrorPage";

export const metadata = {
  title: "Unauthorized - D-Libro | Digital Book Library for Web Skill Training",
};

const Error401 = () => {
  return (
    <ErrorPage
      error="401"
      title="Unauthorized"
      subTitle="Ooops, you are not authorized to access this page... "
    />
  );
};

export default Error401;
