import Image from "next/image";
import ReuseableCarousel from "../common/ReuseableCarousel";
import { formatDate } from "@/utils/common";
import MobileViewBlog from "../Blog/Category/MobileViewBlog";
import Section from "../shared/Section";
import Link from "next/link";

const Card = ({ featuresBlogs }) => {
  return (
    <Section
      sectionClasses="featured-blogs-wrapper mb-80"
      widthHandlerDivClasses="featured-blogs-card-wrapper"
    >
      <ReuseableCarousel>
        {featuresBlogs?.map((blog, index) => (
          <Link href={`/blog/${blog?.slug}/`}>
            <div className="featured-blog-card" key={index}>
              <Image
                src={blog?.header_image}
                width={380}
                height={200}
                style={{ background: blog?.background_color }}
              />
              <div className="featured-blog-card-inner">
                <p>{blog?.category?.category_title}</p>
                <h4>{blog?.header_h1_title}</h4>
                <p>{blog?.header_first_paragraph}</p>
                <p>{blog?.header_author?.username}</p>
                <p>
                  {formatDate(blog?.time_for_reading)} •{" "}
                  {blog?.time_for_reading} min read
                </p>
              </div>
            </div>
          </Link>
        ))}
      </ReuseableCarousel>
      <div className="mobile-view-blogs">
        <MobileViewBlog blogs={featuresBlogs} />
      </div>
    </Section>
  );
};

export default Card;
