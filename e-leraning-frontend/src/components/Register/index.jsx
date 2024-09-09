"use client";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import CircularProgress from "@mui/material/CircularProgress";
import ArrowBack from "@mui/icons-material/ArrowBack";
import googleIcon from "@/assets/google.png";
import githubIcon from "@/assets/github.svg";
import Button from "@material-ui/core/Button";
import Box from "@mui/material/Box";
import { useState } from "react";
import {
  auth,
  provider,
  githubProvider,
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
} from "@/../Firebase";
import { signUp, socialLogin } from "@/services/auth";

import { useRouter } from "next/navigation";
import Image from "next/image";
import "@/assets/scss/auth.scss";
import { setCookies } from "@/services/server-action-cookies";

const Register = () => {
  const router = useRouter();

  const [errorMessage, setErrorMessage] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [emailCopy, setEmailCopy] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUserName] = useState("");
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [data, setData] = useState("");

  const isLightTheme = "light";

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

  const handleBack = (e) => {
    e.preventDefault();
    router.push("/");
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!isValidEmail(email)) {
      setErrorMessage(true);
      setMessage("Email is invalid.");
      setTimeout(() => {
        setErrorMessage(false);
        setMessage("");
      }, 3000);
      return;
    }
    setIsLoading(true);

    try {
      const response = await signUp(username, email, password);
      if (response?.result === "ok") {
        setErrorMessage(true);
        setMessage(response?.data?.message);
        setEmail("");
        setUserName("");
        setPassword("");
      } else {
        setMessage(response?.error?.message);
        setErrorMessage(true);
        setData(response?.error);
      }
    } catch (e) {
      console.log("error::", e);
    }

    const timer = setTimeout(() => {
      setErrorMessage(false);
      setMessage("");
      setData("");
    }, 5000);
    setIsLoading(false);
    return () => clearTimeout(timer);
  };

  function isValidEmail(email) {
    var emailPattern = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;
    return emailPattern.test(email);
  }

  const handleGithubLogin = () => {
    signInWithPopup(auth, githubProvider)
      .then(async (result) => {
        result.user.getIdToken().then(async (tkn) => {
          const response = await socialLogin(tkn, updateUser);
          if (response?.result === "ok") {
            const { first_login } = response?.data?.data;
            if (first_login) router.push("/email-verify");
            else router.push("/");
          } else {
            setMessage(response?.error?.message);
            setErrorMessage(response?.error?.message);
          }
        });
      })
      .catch((error) => {
        console.log("e", error);
        setErrorMessage(error?.message);
        setMessage(error?.message);
        GithubAuthProvider.credentialFromError(error);
      });
  };

  const handleGoogleLogin = () => {
    signInWithPopup(auth, provider)
      .then(async (result) => {
        result.user.getIdToken().then(async (tkn) => {
          const response = await socialLogin(tkn, updateUser);
          if (response?.result === "ok") {
            const { first_login } = response?.data?.data;
            if (first_login) router.push("/email-verify");
            else router.push("/");
          } else {
            setErrorMessage(response?.error?.message);
            setMessage(response?.error?.message);
          }
        });
      })
      .catch((error) => {
        console.log("e", error);
        setErrorMessage(error?.message);
        setMessage(error?.message);
        GoogleAuthProvider.credentialFromError(error);
      });
  };

  const hanldeShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <div>
        <button onClick={handleBack} className="back_button">
          <ArrowBack className="backbutton_icon" />{" "}
          <span className="backbutton_text">Back</span>
        </button>

        <form className="registermaincontainer" onSubmit={handleRegister}>
          <div className="editomainpage_container">
            {errorMessage && message ? (
              message === "Account created" ? (
                <div className="successMessage">
                  Verification link has been sent to your email <br />
                  <h4 style={{ color: isLightTheme ? "blue" : "yellow" }}>
                    {emailCopy}
                  </h4>
                  Please verify your email to login.
                </div>
              ) : (
                <div className="errorMessage">{message}</div>
              )
            ) : null}

            {data === "Email or Username already exist" ? (
              <div className="errorMessage">{data}</div>
            ) : null}

            <input
              className={
                isLightTheme ? "addcategory_input_sub" : "addcategory_input"
              }
              placeholder="Username"
              value={username}
              autoComplete="off"
              onChange={(e) => setUserName(e.target.value)}
              required
            />
            <input
              className={
                isLightTheme ? "addcategory_input_sub" : "addcategory_input"
              }
              type="email"
              placeholder="Email"
              value={email}
              autoComplete="off"
              onChange={(e) => {
                setEmail(e.target.value);
                setEmailCopy(e.target.value);
              }}
              required
            />

            <div style={{ display: "flex", position: "relative" }}>
              <input
                className={
                  isLightTheme ? "addcategory_input_sub" : "addcategory_input"
                }
                type={showPassword ? "text" : "password"}
                placeholder="Create a Password"
                value={password}
                min={8}
                max={20}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="new-password"
              />
              {showPassword ? (
                <VisibilityOutlinedIcon
                  style={{
                    position: "absolute",
                    right: "10px",
                    top: "13px",
                    cursor: "pointer",
                  }}
                  onClick={hanldeShowPassword}
                />
              ) : (
                <VisibilityOffOutlinedIcon
                  style={{
                    position: "absolute",
                    right: "10px",
                    top: "13px",
                    cursor: "pointer",
                  }}
                  onClick={hanldeShowPassword}
                />
              )}
            </div>
          </div>
          <div className="registercontainer">
            {isLoading ? (
              <Box
                className="loginbuttontext"
                sx={{ display: "flex", justifyContent: "center" }}
              >
                <CircularProgress color="inherit" size={30} />
              </Box>
            ) : (
              <Button className="update_button" type="submit">
                Register
              </Button>
            )}
          </div>
        </form>

        <div>
          <span className={isLightTheme ? "texttwo" : "orText"}>Or</span>
        </div>

        <div className="loginwithgooglecontainer">
          <div>
            <Button
              variant="text"
              className="signWithGoogle"
              onClick={handleGoogleLogin}
            >
              <Image src={googleIcon} className="googleIcon" alt="google" />
              Sign up with Google
            </Button>
          </div>
          <div></div>
          <div className="loginwithgooglecontainer">
            <div>
              <Button
                variant="text"
                className="signWithGoogle"
                onClick={handleGithubLogin}
              >
                <Image src={githubIcon} className="googleIcon" alt="github" />
                Sign up with Github
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
