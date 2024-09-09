import ErrorPage from "@/components/404";

export const metadata = {
  title: "Not Found - D-Libro | Digital Book Library for Web Skill Training",
};

const NotFound = () => {
  return (
    <ErrorPage
      error="404"
      title="Not Found"
      subTitle="Ooops, looks like this page does not exist..."
    />
  );
};

export default NotFound;
