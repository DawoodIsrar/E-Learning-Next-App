import Logo from "@/assets/icons/FooterLogo";
import Instagram from "@/assets/icons/Instagram";
import Facebook from "@/assets/icons/Facebook";
import Twitter from "@/assets/icons/TwitterX";
import Section from "@/components/shared/Section";
import FooterCourses from "./FooterCourses";
import Pages from "./Pages";
import Link from "next/link";
import "./style.scss";

const Footer = ({ coursesAvailible }) => {
  return (
    <Section
      sectionClasses="main-footer-wrapper main-footer-container"
      widthHandlerDivClasses="main-container-footer"
    >
      <div className="logo-links">
        <div className="footer-logo">
          <div className="logos-wrapper">
            <div className="logos">
              <Logo width="112" height="24" />
              <div className="mob-logo">
                <div className="footer-social-icons">
                  <Link
                    href="https://www.instagram.com/d_libro_llc/"
                    target="__blank"
                  >
                    <Instagram width="24" height="24" />
                  </Link>
                  <Link
                    href="https://www.facebook.com/people/D-Libro/61563459802541/"
                    target="__blank"
                  >
                    <Facebook width="24" height="24" />
                  </Link>
                  <Link href="https://x.com/D_Libro_llc" target="__blank">
                    <Twitter width="24" height="24" />
                  </Link>
                </div>
              </div>
            </div>

            <p>
              From beginner to master of web design, coding, infrastructure
              operation, business development and marketing
            </p>
          </div>
          <div className="large-screen-logos">
            <div className="footer-social-icons">
              <Link
                href="https://www.instagram.com/d_libro_llc/"
                target="__blank"
              >
                <Instagram width="24" height="24" />
              </Link>
              <Link
                href="https://www.facebook.com/people/D-Libro/61563459802541/"
                target="__blank"
              >
                <Facebook width="24" height="24" />
              </Link>
              <Link href="https://x.com/D_Libro_llc" target="__blank">
                <Twitter width="24" height="24" />
              </Link>
            </div>
          </div>
        </div>
        <div className="footer-links">
          <FooterCourses coursesAvailible={coursesAvailible} />
          <div className="company-link">
            <Pages className="heading" />
          </div>
        </div>
      </div>

      <div className="footer-logo-btn">
        <p className="footer-text">© 2024 D-Libro. All Rights Reserved</p>
      </div>
    </Section>
  );
};

export default Footer;
