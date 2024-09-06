import Image from "next/image";
import Nasdaq from "@/assets/images/nasdaq-light.svg";
import VolksWagan from "@/assets/images/volkswagen-light.svg";
import Box from "@/assets/images/box-light.svg";
import NetApp from "@/assets/images/netapp-light.svg";
import EvenBrite from "@/assets/images/eventbrite-light.svg";
import mainLogo from "@/assets/images/Logo.png";
import React from "react";
import "./style.scss";
import Link from "next/link";
import LanguagesModal from "./Languages";
import { footerLinks } from "@/Utils/data";

const Footer = () => {
  return (
    <div className="footer-wrapper">
      <div className="footer-top">
        <p>
          Top companies choose <a>Udemy Business</a>
          to build in-demand career skills.
        </p>
      </div>
      <div className="footer-links">
        <div className="links-wrapper">
          <div className="footer-links-list">
            <ul>
              {footerLinks.slice(0, 4).map((item) => (
                <li key={item.id}>
                  <Link href={item.link}>{item.title}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="footer-links-list">
            <ul>
              {footerLinks.slice(4, 8).map((item) => (
                <li key={item.id}>
                  <Link href={item.link}>{item.title}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="footer-links-list">
            <ul>
              {footerLinks.slice(8, 10).map((item) => (
                <li key={item.id}>
                  <Link href={item.link}>{item.title}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <LanguagesModal />
      </div>
      <div className="footer-logo">
        <Image src={mainLogo} alt="logo-icon" width={100} height={100} />
        <p>@2024 udemy ,Inc</p>
      </div>
    </div>
  );
};

export default Footer;
