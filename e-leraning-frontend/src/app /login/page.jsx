import Login from "@/components/Login";
import { getUserCookies } from "@/services/server-action-cookies";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Login - D-Libro | Digital Book Library for Web Skill Training",
};

const LoginPage = async ({ searchParams }) => {
  let user = await getUserCookies();
  user = user && JSON.parse(user);

  if (user?.id) {
    if (searchParams.redirect) {
      redirect(searchParams.redirect);
    } else {
      redirect("/");
    }
  } else {
    return <Login />;
  }
};

export default LoginPage;
