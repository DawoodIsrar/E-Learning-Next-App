"use client";
import Section from "../../shared/Section";
import ArrowBack from "@/assets/icons/ArrowBackIcon";
import CoursesAvailable from "./CoursesAvalaible";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { getBookmarksData } from "@/services/bookmark";
import Loading from "@/components/Loading";
import "./style.scss";

const BookmarksGroupBy = {
  course: "course",
  bookmark: "bookmark",
};

const MyLibraryCourses = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const { accessToken, user } = session || {};

  const role = user?.role;
  const token = accessToken;

  const [data, setData] = useState([]);
  const [showDataBy, setShowDataBy] = useState(BookmarksGroupBy.bookmark);
  const [isLoading, setIsLoading] = useState(false);
  const [totalBookmark, setTotalBookmark] = useState(0);

  useEffect(() => {
    if (token && role) {
      getLibraryData();
    }
  }, [showDataBy, token, role]);

  const handleBack = () => {
    router.back();
  };

  const getLibraryData = async () => {
    try {
      setIsLoading(true);

      const response = await getBookmarksData(token, role, showDataBy);
      setData(response);

      const totalItemCount = response?.reduce(
        (sum, data) => sum + data?.topics.length,
        0
      );
      setTotalBookmark(totalItemCount);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChangeDataShow = () => {
    setShowDataBy((prev) =>
      prev === BookmarksGroupBy.bookmark
        ? BookmarksGroupBy.course
        : BookmarksGroupBy.bookmark
    );
  };

  return (
    <>
      <div className="back-btn-wrapper">
        <div className="back-btn" onClick={handleBack}>
          <ArrowBack />
          <p>Back</p>
        </div>
      </div>
      <Section widthHandlerDivClasses="my-library-courses">
        <div className="my-library-courses-result">
          <div className="title-and-btn">
            <div className="title">
              <h2>My Library</h2>
              <h2 className="bookmark-number">{totalBookmark} Bookmark</h2>
            </div>
            <div className="bookmark-or-course-btn">
              <div
                className={
                  showDataBy === BookmarksGroupBy.bookmark
                    ? "selected non-selected"
                    : "non-selected"
                }
                onClick={handleChangeDataShow}
              >
                By Bookmark
              </div>
              <div
                className={
                  showDataBy === BookmarksGroupBy.course
                    ? "selected non-selected"
                    : "non-selected"
                }
                onClick={handleChangeDataShow}
              >
                By Courses
              </div>
            </div>
          </div>
          <div className="my-library-container">
            {isLoading ? (
              <Loading />
            ) : (
              <>
                {data?.map((item) => (
                  <div className="my-library-courses-available">
                    <CoursesAvailable
                      onBookmarkChanged={() => {
                        getLibraryData();
                      }}
                      key={item.id}
                      title={item.name}
                      bookmarkColor={item.color}
                      chapterDetails={item.topics}
                      islibrary={showDataBy !== "bookmark"}
                      isLibraryCourse={showDataBy !== "bookmark"}
                    />
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
      </Section>
    </>
  );
};

export default MyLibraryCourses;
