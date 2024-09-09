import "./style.scss";
import { usePathname, useRouter } from "next/navigation";

const FirstLogin = ({ hideModal = () => {} }) => {
  const pathname = usePathname();
  const router = useRouter();
  const handleRoute = () => {
    if (pathname === "/email-verify/") {
      router.push("/");
    } else {
      hideModal();
    }
  };
  return (
    <div className="first-login">
      <div className="first-login-container">
        <h2 className="first-login-heading">Thank You For Signing Up!</h2>
        <p>Please verify your email</p>
        <div className="">
          <p className="button-on-first-login" onClick={handleRoute}>
            {pathname === "/email-verify/" ? "Go to home" : "Continue"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default FirstLogin;
