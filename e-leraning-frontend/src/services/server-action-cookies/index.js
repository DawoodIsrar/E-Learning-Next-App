"use server";
import { cookies } from "next/headers";

export const getColorModeCookies = () => {
  return cookies().get("colorMode");
};

export const setCookies = (key, value, options) => {
  cookies().set(key, value, options);
};

export const getCookiesByKey = (key) => {
  return cookies().get(key)?.value;
};
export const getAccessTokenCookies = () => {
  return cookies().get("access_token")?.value;
};

export const getUserCookies = () => {
  return cookies().get("user")?.value;
};
export const deleteUserCookie = () => {
  cookies().delete("user");
};
export const deleteAccessTokenCookie = () => {
  cookies().delete("access_token");
};
export const deleteAllCookies = () => {
  const cookieNames = ["sessionid", "user", "access_token"]; // Add all cookie names you want to delete
  cookieNames.forEach((cookieName) => cookies().delete(cookieName));
};
