"use client";
import Logo from "@/assets/icons/HeaderLogo";
import DropdownComponent from "./DropDown";
import Menu from "@/components/Home/Member/MemberHeader/Menu";
import SearchBox from "./Search";
import Link from "next/link";
import UserComponent from "./User";
import { useSession } from "next-auth/react";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import FeedBackAndInquiry from "./FeedBack";
import { usePathname } from "next/navigation";

const Dropdown = dynamic(() => import("./DropDown"), {
  ssr: false,
  loading: () => <DropdownComponent />,
});

const Header = ({ coursesAvailible, user }) => {
  const pathname = usePathname();
  const { status } = useSession();

  const [menuOpen, setMenuOpen] = useState(false);
  const [showFeedBackModal, setShowFeedBackModal] = useState(false);

  const isLoginRouter = pathname.includes("login");

  const handleLoginClick = () => {
    handleMenu(false);
  };

  const handleRegisterClick = () => {
    handleMenu(false);
  };

  const handleMenu = (value) => {
    setMenuOpen(value);
  };
  useEffect(() => {
    if (showFeedBackModal) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "auto";
    }
  }, [showFeedBackModal]);

  return (
    <div className="header-wrapper">
      <div className="main-header">
        <div className="logo-design">
          <Menu
            open={menuOpen}
            handleMenu={handleMenu}
            loggedin={status === "authenticated"}
            showFeedBackModal={showFeedBackModal}
            setShowFeedBackModal={setShowFeedBackModal}
            coursesAvailible={coursesAvailible}
          />
          <FeedBackAndInquiry
            setShowFeedBackModal={setShowFeedBackModal}
            showFeedBackModal={showFeedBackModal}
          />

          <Link
            onClick={() => handleMenu(false)}
            aria-label="home page"
            href="/"
          >
            <Logo className="desktop-view-logo" width="112" height="96"></Logo>
          </Link>
        </div>

        <div className="navbar-buttons">
          <SearchBox
            handleMenu={handleMenu}
            sectionClassName="header-search"
            sectionInputClassName="header-search-input"
          />
          <div className="vertical-divider" />

          <Dropdown />

          {status === "authenticated" && user ? (
            <UserComponent handleMenu={handleMenu} userData={user} />
          ) : (
            <>
              <Link
                onClick={handleLoginClick}
                className={`login-Button ${
                  isLoginRouter ? "no-pointer-events" : ""
                }`}
                href={`/login?redirect=${encodeURIComponent(pathname)}`}
              >
                <p>Log in</p>
              </Link>
              <Link
                onClick={handleRegisterClick}
                className="signup-Button"
                href="/register"
              >
                <p> Sign up</p>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
