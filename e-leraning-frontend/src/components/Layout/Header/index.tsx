"use client";
import searchIcon from "@/assets/images/searchIcon.png";
import mainLogo from "@/assets/images/Logo.png";
import cartIcon from "@/assets/images/cartIcon2.png";
import languageIcon from "@/assets/images/languagesIcon.png";
import hamburgerIcon from "@/assets/images/hamburgerIcon.jpeg";
import ArrowHeadRIght from "@/assets/images/arrowHeadRight.png";
import React, { useState } from "react";
import Image from "next/image";
import MobileMenu from "./MobileMenu";
import { listMenu } from "@/Utils/data";
import "./style.scss";
import { redirect } from "next/navigation";
import Link from "next/link";
import LanguagesModal from "@/components/Layout/Footer/Languages";
import SearchModal from "./SearchModal";
import ThemeDropDown from "./ThemeDropdown";

const Header = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const [openSearchBar, setSearchBar] = useState(false);
  const handleMenu = () => {
    setOpenMenu((prev) => !prev);
  };
  const handleSearchBar = () => {
    console.log("click on search");
    setSearchBar((prev) => !prev);
  };
  return (
    <>
      <div className="header-wrapper">
        <div className="mbl-view-menu" onClick={handleMenu}>
          <Image src={hamburgerIcon} alt="burger-icon" />
        </div>
        <div className="logo">
          <Link href={"/"}>
            <Image src={mainLogo} alt="logo-img" width={50} height={50} />
          </Link>
        </div>
        <div className="menu-categories">
          <ThemeDropDown />
        </div>
        <div className="search-bar">
          <div className="search-input">
            <Image src={searchIcon} alt="search-icon" />
            <input placeholder="Search for anything"></input>
          </div>
        </div>
        <div className="business">
          <p>Udemy business</p>
        </div>
        <div className="teach-courses">
          <p>Teach on Udemy</p>
        </div>
        <div className="cart">
          <Image
            className="search-icon"
            src={searchIcon}
            alt="search-icon"
            onClick={handleSearchBar}
          />
          <Image src={cartIcon} alt="cart-icon" />
        </div>
        <div className="auth-buttons">
          <Link href={"/login"}>Log in</Link>
          <Link href={"/signup"}>Sign Up</Link>
          <LanguagesModal />
        </div>
        <div className="languages-btn"></div>
      </div>
      {openMenu && <MobileMenu closedMenu={handleMenu} />}
      {openSearchBar && <SearchModal setSearchBar={handleSearchBar} />}
    </>
  );
};

export default Header;
