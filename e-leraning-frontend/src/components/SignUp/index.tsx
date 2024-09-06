import Image from "next/image";
import Section from "@/components/Section";
import Mens from "@/assets/images/mens.webp";
import signUpTabletView from "@/assets/images/sign-up-tablet-view.webp";
import "./style.scss";
import Form from "./Form";
interface SignUpProps {}
const SignUp = (props: SignUpProps) => {
  return (
    <Section
      widthHandler="sign-up-wrapper-width"
      sectionWrapper="sectionWrapper"
      bgColor="bg"
    >
      <div className="signup-page-wrapper">
        <div className="img-wrapper">
          <Image src={Mens} alt="mens-img" className="sign-page-img" />
          <Image
            src={signUpTabletView}
            alt="mens-img"
            className="tablet-view-img"
          ></Image>
        </div>

        <div className="registration-form-wrapper">
          <h1>Sign up and start learning</h1>
          <Form />
        </div>
      </div>
    </Section>
  );
};

export default SignUp;
