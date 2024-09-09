"use client";
import CourseResult from "./CourseResult";
import "./style.scss";
import Banner from "./Banner";
import CourseButtons from "./../Course/Buttons";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

import { useSession } from "next-auth/react";
import { searchAction, searchByCourse } from "@/services/search";
import { makeFooterSticky } from "@/utils/common";

const SearchResultCourses = () => {
  const [loading, setLoading] = useState(true);
  const [responseData, setResponseData] = useState([]);

  const searchParams = new URLSearchParams(
    typeof window !== "undefined" ? window.location.search : ""
  );
  const query = searchParams.get("query");
  const type = searchParams.get("type");

  const pathname = usePathname();
  const { data: session } = useSession();
  const { accessToken, user } = session || {};
  const token = accessToken;
  const role = user?.role;

  useEffect(() => {
    const searchResult = async () => {
      let response = {};
      if (type === "topic") {
        response = await searchAction(query, "", token, role);
      } else if (type === "course") {
        response = await searchByCourse(token, query);
      }

      if (response?.data?.length === 0) {
        setResponseData([]);
      } else {
        setResponseData(response?.data);
      }
      setLoading(false);
    };

    setLoading(true);
    searchResult();
  }, [token, pathname, query, type]);

  useEffect(() => {
    makeFooterSticky(responseData);
  }, [responseData]);

  return (
    <>
      <Banner />
      <CourseResult data={responseData} loading={loading} query={query} />
      <CourseButtons ratingModal={false} />
    </>
  );
};

export default SearchResultCourses;
