"use client";
import { useContext, useEffect, useRef, useState } from "react";
import BookmarkIcon from "@/assets/icons/BookMark";
import { useSession } from "next-auth/react";
import { addContentBookmark } from "@/services/bookmark";
import { usePathname } from "next/navigation";
import { UserContext } from "@/components/Layout/Wrapper/ContextProviders";
import "./style.scss";

const Bookmark = ({ topicId, bookmarkValue = {}, onBookmarkChanged }) => {
  const { userBookMarkList } = useContext(UserContext);
  const [popUp, setPopUp] = useState(false);
  const pathname = usePathname();
  const [color, setColor] = useState(
    pathname.includes("course") || pathname.includes("topic")
      ? bookmarkValue?.color
      : userBookMarkList?.color
  );
  const { data: session } = useSession();
  const role = session?.user?.role;
  const accessToken = session?.accessToken;
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setPopUp(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleShowPopUp = async (e) => {
    if (userBookMarkList.length) {
      setPopUp(true);
    } else {
      setColor("");
      await addContentBookmark(topicId, -1, role, accessToken);
      onBookmarkChanged();
    }
  };

  const handleSelection = (selectedColor, optionId) => {
    setPopUp(false);
    setColor(selectedColor);
    addContentBookmark(topicId, optionId, role, accessToken);
  };

  useEffect(() => {
    if (popUp) {
      const dropdown = document.getElementsByClassName(
        `dropdown-content ${topicId}`
      )[0];
      const cardRect = dropdown?.getBoundingClientRect();
      const windowWidth = window?.innerWidth;
      const rightSpace = cardRect?.right;

      if (windowWidth < rightSpace + 100) {
        dropdown.style.left = "-200px";
      }

      dropdown.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [popUp]);

  useEffect(() => {
    if (pathname.includes("topic") && popUp) {
      const dropdown = document.getElementsByClassName(
        `dropdown-content ${topicId}`
      )[0];
      dropdown.style.top = "28px";
    }
  }, [pathname, popUp]);
  const handleBookMark = (e) => {
    const id = e.currentTarget.getAttribute("data-id");
    const color = e.currentTarget.getAttribute("data-color");
    handleSelection(color, id);
  };
  return (
    <div className={`chapter-card-title-outer ${topicId}`}>
      <button
        className="bookmark-button-icon"
        aria-label="topic bookmark"
        onClick={handleShowPopUp}
      >
        <BookmarkIcon
          width="24"
          height="24"
          color={color || "none"}
          stroke={color || "black"}
          className={"bookImage"}
        />
      </button>
      {popUp && (
        <div
          ref={dropdownRef}
          className={`dropdown-content ${topicId}`}
          onClick={() => {
            setPopUp(false);
          }}
        >
          <div key={"unBookmark"}>
            <button
              onClick={(event) => {
                handleSelection("", -1);
              }}
            >
              <BookmarkIcon
                width="24"
                height="24"
                color={"transparent"}
                stroke={"black"}
                className="bookImage"
              />
            </button>
          </div>
          {userBookMarkList?.map((item, index) => (
            <div key={index} id={item.id}>
              <button
                key={item.id}
                data-id={item?.id}
                data-color={item?.color}
                onClick={handleBookMark}
              >
                <BookmarkIcon
                  width="24"
                  height="24"
                  fill={item.color || "transparent"}
                  color={item.color || "transparent"}
                  stroke={item.color || "black"}
                  className="bookImage"
                />
              </button>

              {/* <button id={item?.color + item?.id} onClick={handleBookMark(e)}>
                <BookmarkIcon
                  width="24"
                  height="24"
                  fill={item.color || "transparent"}
                  color={item.color || "transparent"}
                  stroke={item.color || "black"}
                  className="bookImage"
                />
              </button> */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Bookmark;
