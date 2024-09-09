"use client";
import Section from "../../shared/Section";
import ArrowBack from "@/assets/icons/ArrowBackIcon";
import CoursesAvailable from "./CoursesAvalaible";
import Loading from "@/components/Loading";
import { useRouter } from "next/navigation";
import "./style.scss";

const CourseResult = ({ data, loading, query }) => {
  const router = useRouter();
  const handleBack = () => {
    router.back();
  };

  return (
    <>
      <div className="back-btn-wrapper">
        <div className="back-btn" onClick={handleBack}>
          <ArrowBack />
          <p>Back</p>
        </div>
      </div>
      <Section widthHandlerDivClasses="recently-viewed-result-courses">
        {loading ? (
          <Loading />
        ) : (
          <>
            <div className="recently-viewed-courses-result">
              <h1>
                {data?.length} Results for "{query}"
              </h1>
              <div className="recently-viewed-courses-result-container">
                <CoursesAvailable data={data} />
              </div>
            </div>
          </>
        )}
      </Section>
    </>
  );
};

export default CourseResult;
