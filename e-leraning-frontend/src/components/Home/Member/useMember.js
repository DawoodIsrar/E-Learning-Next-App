import {
  getBookmarkedCourses,
  getRecentlyViewCourses,
} from "@/services/course";
import { home } from "@/services/home";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";

const useMemberPage = () => {
  const [loading, setLoading] = useState({
    bookmarkCourses: false,
    coursesByCategory: false,
    recentlyViewedCourses: false,
  });
  const [mainPageData, setMainPageData] = useState({
    bookmarkCourses: null,
    coursesByCategory: null,
    recentlyViewedCourses: null,
  });
  const { status, data: session } = useSession();
  const { accessToken, user } = session || {};
  const role = user?.role;

  const setBookmarkedCourses = async () => {
    setLoading((prev) => ({ ...prev, bookmarkCourses: true }));
    const response = await getBookmarkedCourses(role, accessToken);
    setMainPageData((prev) => ({ ...prev, bookmarkCourses: response }));
    setLoading((prev) => ({ ...prev, bookmarkCourses: false }));
  };

  const setRecentlyViewedCourses = async () => {
    setLoading((prev) => ({ ...prev, recentlyViewedCourses: true }));
    const response = await getRecentlyViewCourses(role, accessToken);
    setMainPageData((prev) => ({ ...prev, recentlyViewedCourses: response }));
    setLoading((prev) => ({ ...prev, recentlyViewedCourses: false }));
  };

  const setCourseByCategory = async () => {
    setLoading((prev) => ({ ...prev, coursesByCategory: true }));
    const response = await home();
    setMainPageData((prev) => ({ ...prev, coursesByCategory: response }));
    setLoading((prev) => ({ ...prev, coursesByCategory: false }));
  };

  useEffect(() => {
    if (status !== "loading") {
      setRecentlyViewedCourses();
      setBookmarkedCourses();
      setCourseByCategory();
    }
  }, []);
  return {
    mainPageData,
    loading,
  };
};

export default useMemberPage;
