"use client";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import { verifyUserEmail } from "@/services/auth";
import { useEffect, useState } from "react";
import FirstLogin from "../common/FirstLogin";
import { toast } from "react-toastify";

export default function EmailVerify() {
  const { data: session } = useSession();
  const { accessToken } = session || {};
  const [email, setEmail] = useState(null);
  const [token, setToken] = useState(null);

  const searchParams = new URLSearchParams(
    typeof window !== "undefined" ? window.location.search : ""
  );

  const router = useRouter();
  const userToken = accessToken;

  useEffect(() => {
    setEmail(searchParams.get("email"));
    setToken(searchParams.get("token"));
  }, [searchParams]);

  const handleVerifyEmail = async () => {
    try {
      const response = await verifyUserEmail(email, token);
      if (response?.result === "error") {
        toast.error(response?.error?.message);
        router.push("/");
      }
      if (response?.result === "ok") {
        const { access_token, refresh_token, user } = response?.data?.data;
        const { icon_url, id, role, social_login, username } = user;
        if (typeof window !== "undefined") {
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
        }
        toast.success("Email Verified.");
        router.push("/");
      }
    } catch (e) {
      console.log("error", e);
    }
  };

  useEffect(() => {
    if (email && token && !userToken) {
      handleVerifyEmail(decodeURIComponent(email), token);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [email, token]);

  return (
    <>
      <meta name="robots" content="noindex, nofollow" />
      <FirstLogin />
    </>
  );
}
