import moment from "moment";
import { useEffect } from "react";
import HomePageATF from "@/components/common/Adsense/HomePageATF";
import HomePageSecondHorizontal from "@/components/common/Adsense/HomePageSecondHorizontal";
import HomePageVeticalAdThird from "@/components/common/Adsense/HomePageVeticalAdThird";
import CourseOutlineATF from "@/components/common/Adsense/CourseOutlineATF";
import CourseOutlineAdSecond from "@/components/common/Adsense/CourseOutlineAdSecond";
import CourseOutlineAdThird from "@/components/common/Adsense/CourseOutlineAdThird";
import TopicPageInArticleInContentEnd from "@/components/common/Adsense/TopicPageInArticleInContentEnd";
import TopicPageRightSidebar from "@/components/common/Adsense/TopicPageRightSidebar";
import SitewideMobileAdhesion from "@/components/common/Adsense/SitewideMobileAdhesion";
import BlogHomePageHorizontalAdOne from "@/components/common/Adsense/BlogHomePageHorizontalAdOne";
import BlogHomePageHorizontalAdSecond from "@/components/common/Adsense/BlogHomePageHorizontalAdSecond";
import BlogMobileAdhesion from "@/components/common/Adsense/BlogMobileAdhesion";
import BlogPostPageSidebarDesktop from "@/components/common/Adsense/BlogPostPageSidebarDesktop";

export const UserSettingsModalsTypes = {
  changeUsername: "ChangeUsername",
  changeEmail: "ChangeEmail",
  forgotPassword: "ForgotPassword",
  changePassword: "ChangePassword",
  settings: "Settings",
  deleteAccount: "DeleteAccount",
  deleteAccountSuccess: "DeleteAccountSuccess",
  deleteBookmarks: "DeleteBookmarks",
  deleteBookmarksSuccess: "DeleteBookmarksSuccess",
  editBookmark: "EditBookmark",
};

export const CourseAccessTitles = [
  {
    name: "Editor Only",
    value: "editor_only",
  },
  {
    name: "Member Only",
    value: "member_only",
  },
  {
    name: "Public",
    value: "public",
  },
];

export const getCourseAccessTitle = (access) => {
  let res = access;
  if (access) {
    res = CourseAccessTitles.find((d) => d.value === access).name;
  }
  return res;
};

export function useClickOutside(ref, handler) {
  useEffect(() => {
    const listener = (event) => {
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }

      handler(event);
    };
    if (typeof window !== "undefined") {
      window.document.addEventListener("mousedown", listener);
      window.document.addEventListener("touchstart", listener);
    }

    return () => {
      if (typeof window !== "undefined") {
        window.document.removeEventListener("mousedown", listener);
        window.document.removeEventListener("touchstart", listener);
      }
    };
  }, [ref, handler]);
}

export function getRelativeTime(date) {
  var currentDate = moment();
  var targetDate = moment(date);

  var yearsDiff = currentDate.diff(targetDate, "years");
  if (yearsDiff > 0) {
    return yearsDiff + (yearsDiff === 1 ? " year ago" : " years ago");
  }

  var monthsDiff = currentDate.diff(targetDate, "months");
  if (monthsDiff > 0) {
    return monthsDiff + (monthsDiff === 1 ? " month ago" : " months ago");
  }

  var weeksDiff = currentDate.diff(targetDate, "weeks");
  if (weeksDiff > 0) {
    return weeksDiff + (weeksDiff === 1 ? " week ago" : " weeks ago");
  }

  var daysDiff = currentDate.diff(targetDate, "days");
  if (daysDiff > 0) {
    return daysDiff + (daysDiff === 1 ? " day ago" : " days ago");
  }

  return "Today";
}

export const getEnglishStatusString = (value) => {
  if (value === "not_started") {
    return "Not Started";
  } else if (value === "wip") {
    return "WIP";
  } else if (value === "done") {
    return "Done";
  }
  return "";
};

export const countSpecificWord = (str, word) => {
  const regex = new RegExp(`\\b${word}\\b|${word}\\W|\\W${word}`, "gi");
  const matches = str?.match(regex);
  return matches ? matches.length : 0;
};

/**
 * Do not SSR the page when navigating.
 * Has to be added right before the final getServerSideProps function
 */
export const hasNavigationCSR = (next) => async (ctx) => {
  if (ctx.req.url?.startsWith("/_next")) {
    return {
      props: {},
    };
  }
  return next?.(ctx);
};

export const adToRender = (Component) => {
  return Component === "HomePageATF" ? (
    HomePageATF
  ) : Component === "HomePageSecondHorizontal" ? (
    HomePageSecondHorizontal
  ) : Component === "HomePageVeticalAdThird" ? (
    HomePageVeticalAdThird
  ) : Component === "CourseOutlineATF" ? (
    CourseOutlineATF
  ) : Component === "CourseOutlineAdSecond" ? (
    CourseOutlineAdSecond
  ) : Component === "CourseOutlineAdThird" ? (
    CourseOutlineAdThird
  ) : Component === "TopicPageInArticleInContentEnd" ? (
    TopicPageInArticleInContentEnd
  ) : Component === "TopicPageRightSidebar" ? (
    TopicPageRightSidebar
  ) : Component === "SitewideMobileAdhesion" ? (
    SitewideMobileAdhesion
  ) : Component === "BlogHomePageHorizontalAdOne" ? (
    BlogHomePageHorizontalAdOne
  ) : Component === "BlogHomePageHorizontalAdSecond" ? (
    BlogHomePageHorizontalAdSecond
  ) : Component === "BlogMobileAdhesion" ? (
    BlogMobileAdhesion
  ) : Component === "BlogPostPageSidebarDesktop" ? (
    BlogPostPageSidebarDesktop
  ) : (
    <></>
  );
};

const adSlotsTopics = ["2905865630", "3313059748", "1081765616"];
const adSlotsBlogs = ["4404210754", "3067078359", "1921517647"];

export const insertAdDynamically = (adRef, Component) => {
  const adSlotsToUse = Component.includes("topic")
    ? adSlotsTopics
    : adSlotsBlogs;
  try {
    // Get the editor div
    const editorDiv = document.querySelector(".editor-content");

    if (editorDiv) {
      // Get all <h2> elements within the editor div
      const headings = Array.from(editorDiv.querySelectorAll("h2"));

      // Determine the number of ads to insert based on the number of <h2> elements
      const adsToInsert = Math.min(Math.floor(headings.length / 2), 3);
      // Create ad elements and insert them before the appropriate <h2> elements
      for (let i = 0; i < adsToInsert; i++) {
        const newDiv = document.createElement("div");
        newDiv.className = "AdWrapper mt-10 mb-10";
        const newIns = document.createElement("ins");
        newIns.className = "adsbygoogle";
        newIns.style.display = "block";
        newIns.setAttribute(
          "data-ad-client",
          `ca-${process.env.NEXT_PUBLIC_ADSENSE_ID}`
        );
        newIns.setAttribute("data-ad-slot", adSlotsToUse[i]); // Unique ad slot for each ad
        newIns.setAttribute("data-ad-format", "auto");
        newIns.setAttribute("data-full-width-responsive", "true");
        adRef.current = newIns;
        newDiv.appendChild(newIns);

        // Insert the ad before the (i + 1) * 2 th <h2> element
        const insertBeforeNode = headings[(i + 1) * 2 - 1];
        if (insertBeforeNode) {
          editorDiv.insertBefore(newDiv, insertBeforeNode);
        }
      }
    }
  } catch (error) {
    console.error("Error inserting ads dynamically:", error);
  }
};
