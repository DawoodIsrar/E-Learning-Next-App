import Section from "../../shared/Section/index";
import { formatDateForBlogDeatail, formatReadingTime } from "@/utils/common";
import htmlCategory from "@/assets/images/HtmlCategory.svg";
import Image from "next/image";
import "./style.scss";

const BlogBanner = ({ blogPost }) => {
  return (
    <Section
      sectionClasses="blog-banner-wrapper"
      bgcolor={blogPost?.background_color}
    >
      <div className="wrapper">
        <div className="content">
          <h1>{blogPost?.header_h1_title}</h1>
          <p>{blogPost?.header_first_paragraph}</p>
          <div className="author-name-and-date">
            <p>{blogPost?.header_author?.username}</p>
            <p>{formatDateForBlogDeatail(blogPost?.publication_date)}</p>
            <p>{formatReadingTime(blogPost?.time_for_reading)} min read</p>
          </div>
        </div>
        <div className="img-div">
          {
            <Image
              src={
                blogPost?.header_image ? blogPost?.header_image : htmlCategory
              }
              width={296}
              height={304}
              className="responsive-img "
              alt={blogPost?.header_image_alt}
            />
          }
          <div className="content">
            <p>{blogPost?.header_first_paragraph}</p>
            <div className="author-name-and-date">
              <p>{blogPost?.header_author?.username}</p>
              <p>{formatDateForBlogDeatail(blogPost?.publication_date)}</p>
              <p>{formatReadingTime(blogPost?.time_for_reading)} min read</p>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default BlogBanner;
