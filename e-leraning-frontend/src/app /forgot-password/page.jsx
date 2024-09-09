import ForgotPassword from "@/components/ForgotPassword";

export const metadata = {
  title:
    "Forgot Password - D-Libro | Digital Book Library for Web Skill Training",
};

const ForgotPasswordPage = ({ searchParams }) => {
  return <ForgotPassword paramEmail={searchParams?.email} />;
};

export default ForgotPasswordPage;
