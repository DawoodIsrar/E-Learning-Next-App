"use client";
import { useEffect, useState } from "react";
import Loading from "@/components/Loading";
import ChapterCard from "./ChapterCard";
import "./style.scss";

const CoursesAvailable = ({ data }) => {
  const [loading, setLoading] = useState(true);
  const [courses, setCourses] = useState([]);
  useEffect(() => {
    if (data && data.length >= 0) {
      setCourses(data);
      setLoading(false);
    }
  }, [data]);

  return (
    <div className={!courses.length || loading ? "main-div" : ""}>
      {loading ? (
        <Loading />
      ) : !courses.length ? (
        <p className="course-not-found">No Topic Found</p>
      ) : (
        <div className="topic-search-result-card-wrapper">
          {courses.map((card) => (
            <ChapterCard key={card.id} card={card} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CoursesAvailable;
