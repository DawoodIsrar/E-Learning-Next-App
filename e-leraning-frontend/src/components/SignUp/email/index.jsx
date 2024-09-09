import { useState } from "react";
import Image from "next/image";
import eyeClosed from "@/assets/images/EyeClosed.svg";
import eyeOpen from "@/assets/images/EyeOpen.svg";
import ChevronLeft from "@/assets/icons/ChevronLeft";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Loading from "@/components/Loading";
import { signUp } from "@/services/auth";
import "./style.scss";

const SignupEmail = ({ handleState, isLoading, setIsLoading }) => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    const isEmailValid = validateEmail();
    const isPasswordValid = validatePassword();
    const isUsernameValid = validateUsername();
    if (isEmailValid && isPasswordValid && isUsernameValid) {
      setIsLoading(true);
      try {
        const response = await signUp(userName, email, password);
        if (response?.result === "ok") {
          toast.success(response?.data?.message);
          setEmail("");
          setUserName("");
          setPassword("");
          router.push("/email-verify");
        } else {
          toast.error(response?.error?.message);
        }
      } catch (e) {
        console.log("error::", e);
        setIsLoading(false);
      }

      setIsLoading(false);
      return () => clearTimeout(timer);
    } else {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    handleState(false);
  };
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const validateEmail = () => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.length) {
      setEmailError("Please enter email/username");
      return false;
    }
    if (!emailPattern.test(email)) {
      setEmailError("Please enter a valid email address");
      return false;
    } else setEmailError("");
    return true;
  };

  const validateUsername = () => {
    if (userName.trim().length < 5) {
      setUsernameError("Username is too short (5 characters minimum)");
      return false;
    }
    setUsernameError("");
    return true;
  };

  const validatePassword = () => {
    if (password.length < 8) {
      setPasswordError("Password is too short (8 characters minimum)");
      return false;
    }
    setPasswordError("");
    return true;
  };

  const handleChange = (e) => {
    if (e.target.name === "email") {
      setEmailError("");
      setEmail(e.target.value);
    } else if (e.target.name === "password") {
      setPassword(e.target.value);
      setPasswordError("");
    } else if (e.target.name === "username") {
      setUserName(e.target.value);
      setUsernameError("");
    }
  };
  return (
    <div>
      <section className="sign-up">
        <button onClick={handleBack} className="back-btn">
          <ChevronLeft />
        </button>
        <div>
          <div className="sign-up-inner">
            <h2>Sign up to D-Libro</h2>
            <label htmlFor="input-username">Username</label>
            <input
              value={userName}
              className={`${usernameError && "error"}`}
              onChange={handleChange}
              name="username"
              type="text"
              id="input-username"
            />
            {usernameError && <p className="error-message">{usernameError}</p>}
            <label htmlFor="input-email">Email Address</label>
            <input
              value={email}
              className={`${emailError && "error"}`}
              onChange={handleChange}
              name="email"
              type="text"
              id="input-email"
            />
            {emailError && <p className="error-message">{emailError}</p>}
            <div className="password-label-container">
              <p className="password-label">Password</p>
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
                className="eye-icon"
                alt="show/hide password"
                src={showPassword ? eyeOpen.src : eyeClosed.src}
              />
            </div>
            {passwordError && <p className="error-message">{passwordError}</p>}
            <div className="loading-wrapper">
              <button onClick={handleRegister} className="signup-button">
                Sign up
              </button>{" "}
              {isLoading && <Loading />}
            </div>
          </div>
          <div className="privacy-terms-div">
            <div className="hr"></div>
            <div className="privacy-terms-flex">
              <a href="/privacy-policy" className="privacy-terms">
                Privacy
              </a>
              <p className="p-and-signup">&nbsp;&&nbsp;</p>
              <a href="/terms-of-service" className="privacy-terms">
                Terms
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SignupEmail;
