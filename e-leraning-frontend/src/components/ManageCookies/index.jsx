import { useSession } from "next-auth/react";
import { useEffect } from "react";
import {
  deleteAllCookies,
  setCookies,
  getCookiesByKey,
} from "@/services/server-action-cookies";

const ManageCookies = () => {
  const { data: session, status } = useSession();
  const updateCookies = (user, token) => {
    setCookies("user", JSON.stringify(user), {
      maxAge: 60 * 60 * 24 * 30,
    });
    setCookies("access_token", token, {
      maxAge: 60 * 60 * 24 * 30,
    });
  };

  const manageCookies = async () => {
    const token = await getCookiesByKey("access_token");
    let user = await getCookiesByKey("user");

    user = user && JSON.parse(user);
    if (!session?.accessToken && token) {
      deleteAllCookies();
    } else if (!token && session?.accessToken) {
      updateCookies(session?.user, session?.accessToken);
    } else if (user && Number(user?.id) !== Number(session?.user?.id)) {
      updateCookies(session?.user, session?.accessToken);
    } else if (token && session?.accessToken) {
      if (token !== session?.accessToken) {
        updateCookies(session?.user, session?.accessToken);
      }
    }
  };

  useEffect(() => {
    if (status !== "loading") {
      manageCookies();
    }
  }, [status]);

  return <></>;
};

export default ManageCookies;
