import Link from "next/link";
import GitHub from "@/assets/icons/Github";
import Google from "@/assets/icons/Google";
import SignUpButton from "../../../shared/SignUpButton";
import "./style.scss";

const AuthButtons = () => {
  return (
    <div className="auth-buttons-area">
      <Link className="auth-signup-button" href={`/register`}>
        Sign up for free trial
      </Link>
      <div className="auth-button-wrapper">
        <SignUpButton type={"google"} buttonClasses="auth-buttons">
          <Google width={24} height={24} />
        </SignUpButton>
        <SignUpButton type={"github"} buttonClasses="auth-buttons">
          <GitHub width={24} height={24} />
        </SignUpButton>
      </div>
    </div>
  );
};

export default AuthButtons;
