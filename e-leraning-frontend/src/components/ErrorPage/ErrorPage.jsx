import Link from "next/link";
import "./ErrorPage.scss";

const ErrorPage = ({
  error = "",
  title = "",
  subTitle = "",
  buttonText = "",
}) => {
  return (
    <div className="errorPage">
      <h1>{error}</h1>
      <h3>{title}</h3>
      <p>{subTitle}</p>
      <Link href={"/"}>{buttonText ? buttonText : "Back"} </Link>
    </div>
  );
};

export default ErrorPage;
