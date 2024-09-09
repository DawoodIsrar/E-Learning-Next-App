import React from "react";
import Banner from "./Banner";
import Category from "./Category";
import BlogCard from "./BlogCard";
import Section from "../shared/Section";
import FeaturePost from "./FeaturePost";
import DlibroCourses from "./DlibroCourses";
import { isProduction } from "@/utils/common";
import ChapterBanner from "../common/ChapterBanner";
import InsertAds from "@/components/common/InsertAds";
import "./style.scss";

const Blog = ({ coursesAndTopics }) => {
  const [firstBlog, ...remainingBlogs] = coursesAndTopics.featured_posts;
  coursesAndTopics.blog_categories = coursesAndTopics.blog_categories.sort(
    (a, b) => a.position - b.position
  );

  return (
    <div className="blog-page-main-wrapper">
      <Banner />
      <Section sectionClasses="blog-wrapper">
        <h1 className="seo-h1-title">{coursesAndTopics?.h1_title}</h1>
        <div className="CardandFeature">
          <div className="heading">
            <h2>Feature Posts</h2>
          </div>
          <BlogCard blogData={firstBlog} />
          <FeaturePost blogData={remainingBlogs} />
        </div>
        {coursesAndTopics.blog_categories?.slice(0, 2).map((item, index) => {
          return (
            <React.Fragment key={index}>
              <Category
                postMainTitle={item?.category_title}
                courseBlogCardTitle={item?.image_title}
                courseImg={item?.image}
                imgLink={item?.image_internal_link}
                classname={item.image_position === "left" ? "" : "reverse"}
                bgColor={item?.image_background_color}
                postData={item?.blogs}
                buttonBgColor={item?.image_button_color}
                category_slug={item.category_slug}
                courseImgAlt={item?.image_alt}
              />
            </React.Fragment>
          );
        })}

        {isProduction && (
          <InsertAds ChildComppnent="BlogHomePageHorizontalAdOne" />
        )}
      </Section>
      <div className="blog-start-chapter">
        <ChapterBanner courseDetails={coursesAndTopics.featured_course[0]} />
      </div>
      <div className="library-carusal">
        <DlibroCourses
          title={"From D-Libro's digital book library"}
          coursesAndTopics={coursesAndTopics.course_carousels}
        />
      </div>
      <Section sectionClasses="blog-wrapper">
        {isProduction && (
          <InsertAds ChildComppnent="BlogHomePageHorizontalAdSecond" />
        )}

        {coursesAndTopics.blog_categories
          ?.slice(2, coursesAndTopics.blog_categories.length)
          .map((item, index) => {
            return (
              <React.Fragment key={index}>
                <Category
                  postMainTitle={item?.category_title}
                  courseBlogCardTitle={item?.image_title}
                  courseImg={item?.image}
                  imgLink={item?.image_internal_link}
                  classname={item.image_position === "left" ? "" : "reverse"}
                  bgColor={item?.image_background_color}
                  postData={item?.blogs}
                  buttonBgColor={item?.image_button_color}
                  category_slug={item.category_slug}
                  courseImgAlt={item?.image_alt}
                />
              </React.Fragment>
            );
          })}
      </Section>
      <div className="blog-start-chapter">
        <ChapterBanner courseDetails={coursesAndTopics.featured_course[1]} />
      </div>
      <DlibroCourses
        title={"Explore more topics"}
        subTitle={
          "Dive deeper! Explore more articles on web development and digital skills."
        }
        coursesAndTopics={coursesAndTopics.topic_carousels}
        topic={true}
      />
    </div>
  );
};

export default Blog;
