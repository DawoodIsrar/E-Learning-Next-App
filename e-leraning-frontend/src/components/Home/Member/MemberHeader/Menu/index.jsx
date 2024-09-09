"use client";
import { Fragment, useEffect, useRef } from "react";
import MenuIcon from "@/assets/icons/Menu";
import CrossMenuIcon from "@/assets/icons/CrossMenuIcon";
import AccountsIcon from "@/assets/icons/AccountsIcon";
import CourseIcon from "@/assets/icons/CourseMenuHeaderIcon";
import DotsOtherIcon from "@/assets/icons/DotsOtherIcon";
import SearchBox from "@/components/Layout/Header/Search";
import Link from "next/link";
import { usePathname } from "next/navigation";
import MenuDivider from "./MenuDivider";
import NavLinks from "./NavLinks";
import { NavLinks as buttons } from "@/utils/data";
import { signOut, useSession } from "next-auth/react";
import { deleteAllCookies } from "@/services/server-action-cookies";
import { isProduction } from "@/utils/common";
import AboutMenuIcon from "@/assets/icons/AboutMenuIcon";
import FeedBackMenuIcon from "@/assets/icons/FeedBackMenuIcon";
import PublisherMenuIcon from "@/assets/icons/PublisherMenuIcon";
import CourseMenuIcon from "@/assets/icons/CourseMenuIcon";
import "./style.scss";

const Menu = ({
  loggedin,
  open,
  handleMenu,
  showFeedBackModal,
  setShowFeedBackModal,
  coursesAvailible,
}) => {
  const pathname = usePathname();
  const searchBoxRef = useRef(null);
  const { status, data: session } = useSession();
  const isAuthenticated = status === "authenticated";

  const handleOpen = (e) => {
    if (!searchBoxRef.current || !searchBoxRef.current.contains(e.target)) {
      handleMenu(!open);
    }

    if (!open) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "unset";
    }
  };
  const params = usePathname();

  const handleLogout = async () => {
    handleMenu(false);
    await deleteAllCookies();
    if (
      pathname.includes("/my-library") ||
      pathname.includes("/my-recently-viewed")
    ) {
      await signOut({ callbackUrl: `/`, redirect: true });
    } else await signOut({ callbackUrl: `${pathname}`, redirect: true });
  };
  useEffect(() => {
    if (open) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "auto";
    }
  }, [open]);
  const chunkArray = (array, size) => {
    const chunks = [];
    for (let i = 0; i < array?.length; i += size) {
      chunks.push(array.slice(i, i + size));
    }
    return chunks;
  };
  const chunks = chunkArray(coursesAvailible, 7);
  return (
    <>
      <div className="menu" onClick={handleOpen}>
        {open ? (
          <CrossMenuIcon width={16} height={16} />
        ) : (
          <MenuIcon width={16} height={16} />
        )}

        <p className="menu-mode"> Menu</p>
      </div>
      {open && (
        <div id="myModal" className="modal" onClick={handleOpen}>
          <div className="nav-menu">
            <div className="header-mobile-search-wrapper" ref={searchBoxRef}>
              <SearchBox
                handleMenu={handleMenu}
                sectionClassName="header-mobile-search"
                sectionInputClassName="header-mobile-search-input"
              />
              <div className="menu-divider"></div>
            </div>
            <div className="menu-dropdown-wrapper">
              <div className="account-and-other">
                <div className="menu-account">
                  <div className="menu-main-title">
                    <AccountsIcon />
                    <h5> Account</h5>
                  </div>
                  <MenuDivider />
                  {buttons
                    ?.slice(0, session?.user?.role === "editor" ? 3 : 2)
                    .map((data, index) => (
                      <Fragment key={index}>
                        <Link
                          key={data.link}
                          href={
                            isAuthenticated
                              ? data.link
                              : `/login?redirect=${data.link}`
                          }
                        >
                          <NavLinks
                            title={data.title}
                            isActive={params.includes(data.link)}
                            LinkIcon={data.LinkIcon ? data.LinkIcon : ""}
                            className="nav-buttons"
                          />
                        </Link>
                      </Fragment>
                    ))}
                </div>
                <div className="menu-other">
                  <div className="menu-main-title">
                    <DotsOtherIcon />
                    <h5> Other</h5>
                  </div>
                  <MenuDivider />
                  <Link key={"about-link"} href={"/about"}>
                    <NavLinks
                      title={"About D-libro"}
                      isActive={params.includes("/about")}
                      className="nav-buttons"
                      LinkIcon={AboutMenuIcon}
                    />
                  </Link>

                  {!isProduction && (
                    <>
                      <Link key={"blog-link"} href={"/blogs"}>
                        <NavLinks
                          title={"Blogs"}
                          isActive={params.includes("/blog")}
                          className="nav-buttons"
                          LinkIcon={CourseMenuIcon}
                        />
                      </Link>
                    </>
                  )}
                  {status === "authenticated" ? (
                    <div
                      key={"feedback"}
                      onClick={() => {
                        setShowFeedBackModal((prev) => !prev);
                      }}
                    >
                      <NavLinks
                        title={"FeedBack and Enquiry"}
                        isActive={params.includes("#")}
                        className="nav-buttons"
                        LinkIcon={FeedBackMenuIcon}
                      />
                    </div>
                  ) : (
                    <Link key={"feedback"} href="/login">
                      <NavLinks
                        title={"FeedBack and Enquiry"}
                        isActive={params.includes("#")}
                        className="nav-buttons"
                        LinkIcon={FeedBackMenuIcon}
                      />
                    </Link>
                  )}

                  <Link key={"publisher"} href="/publication">
                    <NavLinks
                      title={"Kindle Publications"}
                      isActive={params.includes("#")}
                      className="nav-buttons"
                      LinkIcon={PublisherMenuIcon}
                    />
                  </Link>
                  {loggedin && (
                    <NavLinks
                      title="Log out"
                      className="log-out"
                      onClick={handleLogout}
                      LinkIcon={CourseMenuIcon}
                    />
                  )}
                </div>
              </div>
              <div className="menu-stright-line-divider"></div>

              <div className="menu-other courses-menu">
                <div className="menu-main-title">
                  <CourseIcon />
                  <h5> Courses</h5>
                </div>
                <MenuDivider />
                <div className="courses-list">
                  {chunks.map((chunk, columnIndex) => (
                    <div
                      key={`column-${columnIndex}`}
                      className="course-column"
                    >
                      {chunk.map((course, index) => (
                        <Link
                          key={`courses-link-${columnIndex}-${index}`}
                          href={`/course/${course.course_slug}`}
                        >
                          <NavLinks
                            title={course?.short_title}
                            LinkIcon={CourseMenuIcon}
                            isActive={params.includes("/course")}
                            className="nav-buttons"
                          />
                        </Link>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
              {!loggedin && (
                <div className="auth-button-wrapper">
                  <Link
                    className="login-Button"
                    href={`/login?redirect=${encodeURIComponent(pathname)}`}
                  >
                    Log in
                  </Link>
                  <Link className="signup-Button" href="/register">
                    Sign up
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Menu;
