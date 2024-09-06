"use client";
import Link from "next/link";
import Google from "@/assets/images/googleIcon.jpeg";
import facebookIcon from "@/assets/images/facebookIcon.jpeg";
import Image from "next/image";

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
        <p onClick={handleClick}>First name</p>
        <input type="text" />
      </div>
      <div className="input-wrapper">
        <p onClick={handleClick}>Email</p>
        <input></input>
      </div>
      <div className="input-wrapper">
        <p onClick={handleClick}>Password</p>
        <input></input>
      </div>
      <div className="check-box-div">
        <input type="checkbox"></input>
        <p>
          Send me special offers, personalized recommendations, and learning
          tips.
        </p>
      </div>
      <div className="signup-btn">
        <button>Sign up</button>
      </div>
      <div className="others">
        <span className="seperator"></span>
        <span className="content">Other Sign Up options</span>
        <span className="seperator"></span>
      </div>
      <div className="social-signup">
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
          Already have an account?
          <span>
            <Link href={"/login"}>Log in</Link>
          </span>
        </p>
      </div>
    </div>
  );
};

export default Form;
