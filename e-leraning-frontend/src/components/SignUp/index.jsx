"use client";
import { useState } from "react";
import GitHub from "@/assets/icons/Github";
import Google from "@/assets/icons/Google";
import SignUpButton from "../shared/SignUpButton";
import Link from "next/link";
import SignupEmail from "./email";
import Redirect from "@/components/common/Redirect";
import "./style.scss";

export const Signup = () => {
  const [signupEmail, setSignupEmail] = useState(false);
  const handleClick = (value) => {
    setSignupEmail(value);
  };
  const [isLoading, setIsLoading] = useState(false);
  const [redirecting, setRedirecting] = useState(false);

  return redirecting ? (
    <Redirect />
  ) : (
    <div className="sign-up-section">
      {signupEmail ? (
        <SignupEmail
          handleState={handleClick}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
        />
      ) : (
        <div className="sign-up-inner-div">
          <h2 className="sign-up-intro">Sign up to D-Libro</h2>
          <button onClick={() => handleClick(true)}>Continue with email</button>

          <div className="sign-in-bottom-section">
            <div className="sign-in-inner-div">
              <p className="p-1">or log in with socials</p>
              <div className="auth-button-wrapper">
                <SignUpButton
                  type={"google"}
                  buttonClasses={"auth-buttons"}
                  disable={isLoading}
                  setRedirecting={setRedirecting}
                >
                  <Google width={24} height={24} />
                </SignUpButton>
                <SignUpButton
                  type={"github"}
                  buttonClasses={"auth-buttons"}
                  disable={isLoading}
                  setRedirecting={setRedirecting}
                >
                  <GitHub width={24} height={24} />
                </SignUpButton>
              </div>

              <p className="p-2">
                Already have an account?{"  "}
                <Link href={`/login/`} className="sign-up-link">
                  Log in
                </Link>
              </p>
            </div>

            <div className="privacy-terms-flex">
              <a href="/privacy-policy" className="privacy-terms">
                Privacy
              </a>
              <p className="p-and">&nbsp;&&nbsp;</p>
              <a href="/terms-of-service" className="privacy-terms">
                Terms
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
