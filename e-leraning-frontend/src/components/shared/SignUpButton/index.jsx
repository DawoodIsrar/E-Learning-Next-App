"use client";
import "@/assets/scss/auth.scss";
import {
  auth,
  googleProvider,
  githubProvider,
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
} from "@/../Firebase";
import { socialLogin } from "@/services/auth";
import { useRouter } from "next/navigation";
import { setCookies } from "@/services/server-action-cookies";
import { useEffect, useState } from "react";

const SignUpButton = ({
  type,
  buttonClasses,
  children,
  disable = false,
  setRedirecting,
}) => {
  const router = useRouter();
  const [redirectTo, setRedirectTo] = useState(null);

  const searchParams = new URLSearchParams(
    typeof window !== "undefined" ? window.location.search : ""
  );

  useEffect(() => {
    setRedirectTo(searchParams.get("redirect"));
  }, [searchParams]);

  const redirectUser = () => {
    return redirectTo && redirectTo !== "/email-verify/" ? redirectTo : "/";
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

  const handleGithubLogin = () => {
    signInWithPopup(auth, githubProvider)
      .then(async (result) => {
        result.user.getIdToken().then(async (tkn) => {
          const response = await socialLogin(
            tkn,
            updateUser,
            redirectUser,
            setRedirecting
          );
          if (response?.result === "ok") {
            const { first_login } = response?.data?.data;
            if (first_login) router.push("/?login=first");
          }
        });
      })
      .catch((error) => {
        GithubAuthProvider.credentialFromError(error);
      });
  };

  const handleGoogleLogin = () => {
    signInWithPopup(auth, googleProvider)
      .then(async (result) => {
        result.user.getIdToken().then(async (tkn) => {
          const response = await socialLogin(
            tkn,
            updateUser,
            redirectUser,
            setRedirecting
          );

          if (response?.result === "ok") {
            const { first_login } = response?.data?.data;
            if (first_login) router.push("/?login=first");
          }
        });
      })
      .catch((error) => {
        GoogleAuthProvider.credentialFromError(error);
      });
  };

  return (
    <button
      className={buttonClasses}
      onClick={type === "google" ? handleGoogleLogin : handleGithubLogin}
      disabled={disable}
      aria-label={type === "google" ? "Login with Google" : "Login with GitHub"}
    >
      {children}
    </button>
  );
};

export default SignUpButton;
