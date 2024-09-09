"use client";
import Section from "../../shared/Section";
import ArrowBack from "@/assets/icons/ArrowBackIcon";
import ResultChapters from "./ResultChapters";
import { useRouter } from "next/navigation";
import SearchIcon from "@/assets/icons/SearchIcon";
import TagIcon from "@/assets/icons/TagIcon";
import "./style.scss";
import { useEffect } from "react";
import { makeFooterSticky } from "@/utils/common";

const TopicSearchResult = ({ data, query, tag }) => {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  useEffect(() => {
    makeFooterSticky(data);
  }, [data]);
  return (
    <>
      <div className="back-btn-wrapper">
        <div className="back-btn" onClick={handleBack}>
          <ArrowBack />
          <p>Back</p>
        </div>
      </div>
      <Section widthHandlerDivClasses="topic-search">
        <div className="topic-search-result">
          <div className="search-icon-title-container">
            {tag ? (
              <TagIcon width="36" height="36" />
            ) : (
              <SearchIcon width="36" height="36" />
            )}
            <h1>
              {data?.length} {tag ? "Tags" : "Search"} Results for "{query}"
            </h1>
          </div>

          <div className="topic-search-result-container">
            <ResultChapters data={data} />
          </div>
        </div>
      </Section>
    </>
  );
};

export default TopicSearchResult;
