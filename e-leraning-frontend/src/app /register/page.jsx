import { Signup } from "@/components/Signup";
import { getUserCookies } from "@/services/server-action-cookies";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Register - D-Libro | Digital Book Library for Web Skill Training",
};

const RegisterPage = async ({ searchParams }) => {
  let user = await getUserCookies();
  user = user && JSON.parse(user);

  if (user?.id) {
    if (searchParams.redirect) {
      redirect(searchParams.redirect);
    } else {
      redirect("/");
    }
  } else {
    return <Signup />;
  }
};

export default RegisterPage;
