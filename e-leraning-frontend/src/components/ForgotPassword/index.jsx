"use client";
import UpdatePassword from "@/components/UpdatePassword";
import { forgetPassword, sendVerificationCode } from "@/services/auth";
import Loading from "@/components/Loading";
import ArrowLeft from "@/assets/icons/ArrowLeft";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import OTPInput from "react-otp-input";
import "@/assets/scss/auth.scss";
import "./style.scss";

const ForgetPassword = ({ paramEmail }) => {
  const { data: session } = useSession();
  const { accessToken } = session || {};
  const router = useRouter();
  const token = accessToken;

  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");
  const [validation, setValidation] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [email, setEmail] = useState("");
  const [showCodeInput, setShowCodeInput] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);

  const [changePasswordForm, setChangePasswordForm] = useState(false);

  const handleBack = (e) => {
    e.preventDefault();
    router.push("/");
  };

  const handleVerifyCode = async (e) => {
    e.preventDefault();
    setIsVerifying(true);
    const response = await forgetPassword(email, otp, token);
    if (response?.result === "ok") {
      setValidation(true);
      setMessage("Code verified successfully");
      setIsVerifying(false);

      const timer = setTimeout(() => {
        setMessage("");
        setChangePasswordForm(true);
      }, 5000);
      setIsVerifying(false);
      return () => clearTimeout(timer);
    } else {
      setValidation(true);
      setMessage(response?.error?.message);
    }

    const timer = setTimeout(() => {
      setValidation(false);
      setMessage("");
      if (response?.error?.message === "Code is expire") {
        setShowCodeInput(false);
      }
    }, 5000);
    setIsVerifying(false);

    return () => clearTimeout(timer);
  };

  useEffect(() => {
    if (paramEmail) {
      setEmail(paramEmail);
      setShowCodeInput(true);
      setValidation(true);
      setMessage("Please check your email");
    }
  }, [paramEmail]);

  const handleSendCode = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (!email) {
      setMessage("Email is required");
      setValidation(true);
      const timer = setTimeout(() => {
        setValidation(false);
        setMessage("");
        setIsLoading(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
    if (!email.includes("@") || !email.includes(".")) {
      setMessage("Email is not valid");
      setValidation(true);
      const timer = setTimeout(() => {
        setValidation(false);
        setMessage("");
        setIsLoading(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
    const response = await sendVerificationCode(email, token);
    if (response?.result === "error") {
      setValidation(true);
      setMessage(response?.error?.message);
    }

    if (response?.result === "ok") {
      setShowCodeInput(true);
      setValidation(true);
      setMessage("Please check your email");
    }

    const timer = setTimeout(() => {
      setValidation(false);
      setMessage("");
    }, 5000);
    setIsLoading(false);
    return () => clearTimeout(timer);
  };

  return (
    <div className="forgot-password-main">
      <meta name="robots" content="noindex, nofollow" />
      <button onClick={handleBack} className="back_button">
        <ArrowLeft className="backbutton_icon" />
        <span className="backbutton_text">Back</span>
      </button>
      {changePasswordForm ? (
        <UpdatePassword email={email} otp={otp} />
      ) : (
        <div className="editormainpage_root_contianer">
          <div className="forgot-password-container">
            <div className="forgot-password-text-container">
              <h1>Forget Your Passowrd?</h1>
              {showCodeInput ? (
                <h5>
                  Do not worry. We are here to help you. Please enter the <br />{" "}
                  code to get verified.
                </h5>
              ) : (
                <h5>
                  Do not worry. We are here to help you. Please enter your{" "}
                  <br /> registered email to get verification code
                </h5>
              )}
            </div>
            {validation ? (
              message === "Please check your email" ? (
                <div className="forgetPasswordUserMsg">
                  An email with verification code has been sent to
                  <h4 className="forgot-password-email">{email}</h4>
                </div>
              ) : message === "Code verified successfully" ? (
                <div className="forgetPasswordUserMsg">
                  Code verified successfully. Wait you are being redirected...
                </div>
              ) : (
                <div className="errorMessage">{message}</div>
              )
            ) : null}
            {showCodeInput ? (
              <>
                <input
                  readOnly
                  className="forgot-password-input"
                  type="email"
                  placeholder="Email"
                  autoComplete="off"
                  value={email}
                />
                <OTPInput
                  value={otp}
                  onChange={setOtp}
                  numInputs={4}
                  renderSeparator={<span> </span>}
                  renderInput={(props) => <input {...props} type="number" />}
                  containerStyle="otpContainer-forgot"
                />
              </>
            ) : (
              <input
                className={"forgot-password-input"}
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            )}
          </div>

          <div className="forgot-button-wrapper">
            {showCodeInput ? (
              isVerifying ? (
                <button className="button-forgot ">Verifying...</button>
              ) : (
                <button onClick={handleVerifyCode} className="button-forgot ">
                  Verify
                </button>
              )
            ) : isLoading ? (
              <div className="verify-loading">
                <Loading size={30} />
              </div>
            ) : (
              <button onClick={handleSendCode} className="button-forgot">
                Send Code
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ForgetPassword;
