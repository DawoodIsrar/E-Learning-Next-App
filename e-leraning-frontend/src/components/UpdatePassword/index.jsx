"use client";
import eyeClosed from "@/assets/images/EyeClosed.svg";
import eyeOpen from "@/assets/images/EyeOpen.svg";
import Loading from "@/components/Loading";
import { resetPassword } from "@/services/auth";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import "./style.scss";
import Image from "next/image";
import { toast } from "react-toastify";

const UpdatePassword = ({ email, otp }) => {
  const { data: session } = useSession();
  const { accessToken } = session || {};

  const router = useRouter();
  const token = accessToken;

  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (password?.trim()?.length < 8) {
      setPasswordError("Password is too short (8 characters minimum) ");
      setError(true);
      setIsLoading(false);
    } else {
      const response = await resetPassword(email, password, otp, token);
      if (response?.data?.status) {
        setMessage(response?.data?.message);
        toast.success("Password changed successfully! Login to continue");
        setInterval(() => {
          router.push("/login");
        }, 3000);
      } else {
        setMessage(response?.error?.message);
        toast.error(response?.error?.message);
      }

      const timer = setTimeout(() => {
        setMessage("");
      }, 5000);
      setIsLoading(false);
      return () => clearTimeout(timer);
    }
  };

  const hanldeShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <div className="editormainpage_root_contianer">
        <div className="update-password-top">
          <h1>Verified Successfully </h1>
          <h4>
            You are successfully verified. Please enter <br />
            the new password
          </h4>
        </div>
        <div className="update-password-main">
          {message === "All Fields are Required" ? (
            <div className="forgetPasswordUserMsgs errorMessage ">
              Kindly provide new password.
            </div>
          ) : message === "Password must be 8 or less than 20 characters" ? (
            <div className="forgetPasswordUserMsgs errorMessage">
              Password must be 8 or less than 20 characters.
            </div>
          ) : null}
          <input
            className="update-password-email-input"
            readOnly
            type="email"
            placeholder="Email"
            value={email}
            autoComplete="email"
          />
          <div className="reset-password-container">
            <input
              className={`${passwordError && "error"}`}
              name="password"
              placeholder="New Password"
              autoComplete="new-password"
              value={password}
              onChange={(e) => {
                setPasswordError("");
                setError(false);
                setPassword(e.target.value);
              }}
              type={showPassword ? "text" : "password"}
              id="passwordInput"
            />
            <Image
              onClick={hanldeShowPassword}
              height={22}
              width={22}
              alt="eye icon"
              className="reset-eye-icon"
              src={showPassword ? eyeOpen.src : eyeClosed.src}
            />
          </div>
          {error && (
            <p className="error-message-new-password">{passwordError}</p>
          )}
        </div>

        {isLoading ? (
          <div className="reset-button-loading">
            <Loading size={20} />
          </div>
        ) : (
          <div className="reset-button-wrapper">
            <button
              onClick={handleResetPassword}
              className="button-reset-password"
            >
              Reset Password
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default UpdatePassword;
