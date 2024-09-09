"use client";
import "./style.scss";
import Loading from "@/components/Loading";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { courseHistory } from "@/services/course";
import Chapter from "./Chapter";
import { makeFooterSticky } from "@/utils/common";

const CoursesAvailable = () => {
  const [loading, setLoading] = useState(true);
  const { data: session } = useSession();
  const { accessToken, user } = session || {};

  const token = accessToken;
  const role = user?.role;

  const [history, setHistory] = useState([]);

  const recentViewedCourses = async () => {
    const response = await courseHistory(token, role);
    setHistory(response?.data);
    setLoading(false);
  };

  useEffect(() => {
    if (token && role) {
      recentViewedCourses();
    }
  }, [token, role]);

  useEffect(() => {
    makeFooterSticky(history);
  }, [history]);

  if (loading) {
    return <Loading />;
  }

  return history?.map((item, index) => (
    <Chapter
      key={index}
      title={item.period}
      topicsDetail={item.topics}
      islibrary={true}
    />
  ));
};

export default CoursesAvailable;
