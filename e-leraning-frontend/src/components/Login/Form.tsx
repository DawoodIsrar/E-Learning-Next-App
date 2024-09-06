"use client";
import Image from "next/image";
import Link from "next/link";
import Envelop from "@/assets/images/envelop.png";
import Google from "@/assets/images/googleIcon.jpeg";
import appleIcon from "@/assets/images/appleIcon.png";
import facebookIcon from "@/assets/images/facebookIcon.jpeg";

const Form = () => {
  const handleClick = (e) => {
    const inputElement = (e.target as HTMLElement)
      .nextElementSibling as HTMLInputElement;
    if (inputElement && inputElement.tagName === "INPUT") {
      inputElement.focus();
    }
  };
  return (
    <div className="registration-form">
      <div className="input-wrapper">
        <p onClick={handleClick}>Email</p>
        <input></input>
      </div>

      <div className="forgot-password">
        or
        <span>
          <Link href={"#"}> Forgot password</Link>
        </span>
      </div>

      <div className="login-btn">
        <button>
          <Image src={Envelop} alt="email-icon" width={20} height={20} />
          Log in
        </button>
      </div>
      <div className="others">
        <span className="seperator"></span>
        <span className="content">Other log in options</span>
        <span className="seperator"></span>
      </div>
      <div className="social-login">
        <div className="social-icon">
          <Image src={Google} width={24} height={24} alt="no-icon-found" />
        </div>
        <div className="social-icon">
          <Image
            src={facebookIcon}
            width={24}
            height={24}
            alt="no-icon-found"
          />
        </div>
        <div className="social-icon">
          <Image src={appleIcon} width={24} height={24} alt="no-icon-found" />
        </div>
      </div>
      <div className="terms">
        <p>
          By signing up, you agree to our{" "}
          <span>
            <a href="#">Terms of Use</a>
          </span>{" "}
          and
          <span>
            <a href="#"> Privacy Policy.</a>
          </span>
        </p>
      </div>
      <div className="already-have-account">
        <p>
          Dont have an account?
          <span>
            <Link href={"/signup"}> Sign Up</Link>
          </span>
        </p>
      </div>
      <div className="already-have-account">
        <p>
          <span>
            <Link href={"/signup"}>Log in with your organization</Link>
          </span>
        </p>
      </div>
    </div>
  );
};

export default Form;
