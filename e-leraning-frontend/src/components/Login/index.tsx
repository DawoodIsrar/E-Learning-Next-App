import Image from "next/image";
import Section from "@/components/Section";
import Mens from "@/assets/images/mens.webp";
import PersonImg from "@/assets/images/logIn-page-img.webp";
import "./style.scss";
import Form from "./Form";
interface LoginPageProps {}
const Login = (props: LoginPageProps) => {
  return (
    <Section
      widthHandler="login-wrapper-width"
      sectionWrapper="sectionWrapper"
      bgColor="bg"
    >
      <div className="login-page-wrapper">
        <div className="img-wrapper">
          <Image src={Mens} alt="mens-img" className="login-page-img" />
          <Image
            src={PersonImg}
            alt="mens-img"
            className="tablet-view-img"
          ></Image>
        </div>

        <div className="registration-form-wrapper">
          <h1>Log in to continue your learning journey</h1>
          <Form />
        </div>
      </div>
    </Section>
  );
};

export default Login;
