import React from "react";
import Divider from "./Divider";
import "./style.scss";
import Link from "next/link";
import { formatDate } from "@/utils/common";

const chunkArray = (array, size, isFeaturedPost) => {
  const chunkedArr = [];
  for (let i = 0; i < array?.length; i += size) {
    const chunk = array.slice(i, i + size).map((item) => {
      if (!isFeaturedPost) {
        return { blogs: item };
      } else {
        return item;
      }
    });
    chunkedArr.push(chunk);
  }

  return chunkedArr;
};

const Blogs = ({ blogs, main_title, divider = true, category_slug }) => {
  const isFeaturedPost = main_title === "Feature Post";
  const chunkedblogs = chunkArray(
    blogs,
    category_slug === "web-infrastructure" ? 1 : 2,
    isFeaturedPost
  );

  return (
    <div className="post-wrapper">
      {divider && (
        <>
          <div className="main-title">
            <h2>{main_title}</h2>
          </div>
          <Divider />
        </>
      )}

      <div className="posts-div">
        {chunkedblogs.map((chunk, chunkIndex) => {
          return (
            <div className="posts-chunk-div" key={chunkIndex}>
              {chunk.map((item, index) => {
                return (
                  <React.Fragment key={index}>
                    <div className="single-post-div">
                      <Link
                        href={
                          isFeaturedPost
                            ? `/blog/${item?.slug}`
                            : `/blog/${item?.blogs?.slug}`
                        }
                      >
                        <h4>
                          {isFeaturedPost
                            ? item?.header_h1_title
                            : item?.blogs?.header_h1_title}
                        </h4>
                      </Link>
                      {!isFeaturedPost && (
                        <p className="first-paragraph">
                          {isFeaturedPost
                            ? item?.header_first_paragraph
                            : item?.blogs?.header_first_paragraph}
                        </p>
                      )}
                      <div className="post-date">
                        <p>
                          {isFeaturedPost
                            ? item?.header_author?.username
                            : item?.blogs?.header_author?.username}
                        </p>

                        <p>
                          {isFeaturedPost
                            ? formatDate(item?.publication_date)
                            : formatDate(item?.blogs?.publication_date)}
                        </p>
                      </div>
                    </div>
                    <Divider />
                  </React.Fragment>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Blogs;
