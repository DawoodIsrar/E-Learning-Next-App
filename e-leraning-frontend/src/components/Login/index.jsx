"use client";
import { useState } from "react";
import GitHub from "@/assets/icons/Github";
import Google from "@/assets/icons/Google";
import SignUpButton from "../shared/SignUpButton";
import Loading from "@/components/Loading";
import eyeClosed from "@/assets/images/EyeClosed.svg";
import eyeOpen from "@/assets/images/EyeOpen.svg";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { logIn } from "@/services/auth";
import { setCookies } from "@/services/server-action-cookies";
import { signIn } from "next-auth/react";
import { toast } from "react-toastify";
import Redirect from "@/components/common/Redirect";
import "./style.scss";

const Login = () => {
  const router = useRouter();
  const userSettingState = null;

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [redirecting, setRedirecting] = useState(false);

  const searchParams = new URLSearchParams(
    typeof window !== "undefined" ? window.location.search : ""
  );
  const redirectTo = searchParams.get("redirect");

  const handleChange = (e) => {
    if (e.target.name === "email") {
      setEmailError("");
      setEmail(e.target.value);
    } else if (e.target.name === "password") {
      setPassword(e.target.value);
      setPasswordError("");
    }
  };

  const validateEmail = () => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.length) {
      setEmailError("Please enter email/username");
      return false;
    }
    if (
      email.includes("@") &&
      email.includes(".com") &&
      !emailPattern.test(email)
    ) {
      setEmailError("Please enter a valid email address");
      return false;
    } else setEmailError("");
    return true;
  };

  const validatePassword = () => {
    if (password.length < 6) {
      setPasswordError("Password is too short (6 characters minimum)");
      return false;
    }
    setPasswordError("");
    return true;
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const updateUser = (user, token) => {
    setCookies("user", JSON.stringify(user), {
      maxAge: 60 * 60 * 24 * 30,
      httpOnly: true,
    });
    setCookies("access_token", token, {
      maxAge: 60 * 60 * 24 * 30,
      httpOnly: true,
    });
  };
  const redirectUser = () => {
    if (redirectTo !== null && redirectTo !== "/email-verify/") {
      router.push(`${redirectTo}`);
    } else {
      router.push("/");
    }
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    const isEmailValid = validateEmail();
    const isPasswordValid = validatePassword();

    if (isEmailValid && isPasswordValid) {
      setIsLoading(true);
      try {
        const response = await logIn(email, password, userSettingState);

        if (response?.result === "ok") {
          const { access_token, refresh_token, user } = response?.data?.data;
          const { icon_url, id, role, social_login, username } = user;

          await signIn("credentials", {
            redirect: false,
            access_token,
            refresh_token,
            email: user?.email,
            icon_url,
            id,
            role,
            social_login,
            username,
          });
          setRedirecting(true);
          updateUser(user, access_token);
          redirectUser();
        } else {
          setMessage(response?.error?.message);
          setIsLoading(false);
          toast.error(response?.error?.message);
        }
      } catch (e) {
        setIsLoading(false);
      }
      const timer = setTimeout(() => {
        setMessage("");
      }, 5000);
      return () => clearTimeout(timer);
    }
  };
  return redirecting ? (
    <Redirect />
  ) : (
    <div className="login_main">
      <div className="login_container">
        <h3 className="login_intro">Log in to D-Libro</h3>

        <p className="email-label">Email Address or Username</p>
        <input
          className={`${emailError && "error"}`}
          name="email"
          value={email}
          onChange={handleChange}
          type="text"
        />
        {emailError && <p className="error-message">{emailError}</p>}

        <div className="forgot-password">
          <p className="password-label">Password</p>
          <a href="/forgot-password" className="forgot">
            Forgot?
          </a>
        </div>

        <div className="password-container">
          <input
            className={`${passwordError && "error"}`}
            name="password"
            value={password}
            onChange={handleChange}
            type={showPassword ? "text" : "password"}
            id="passwordInput"
          />
          <Image
            onClick={handleShowPassword}
            height={22}
            width={22}
            alt="eye icon"
            className="eye-icon"
            src={showPassword ? eyeOpen.src : eyeClosed.src}
          />
        </div>
        {passwordError && <p className="error-message">{passwordError}</p>}

        <button disabled={isLoading} onClick={handleLogin} className="button">
          Log In
        </button>
        <div className="loading-wrapper-signin">{isLoading && <Loading />}</div>

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
              <Link href={`/register/`} className="sign-up-link">
                Sign up
              </Link>
            </p>
          </div>

          <div className="privacy-terms-div">
            <div className="hr"></div>
            <div className="privacy-terms-flex">
              <a href="/privacy-policy" className="privacy-terms">
                Privacy
              </a>
              <p className="p-and-login">&nbsp;&&nbsp;</p>
              <a href="/terms-of-service" className="privacy-terms">
                Terms
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
