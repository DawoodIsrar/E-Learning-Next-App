import Section from "@/components/shared/Section";
import Link from "next/link";
import { blogCategories } from "@/utils/data";
import Card from "./Card";
import Divider from "../Blog/Blogs/Divider";
import { getFeaturedBlogs } from "@/services/blog";
import "./style.scss";

const FeaturedBlogs = async () => {
  const featuresBlogs = await getFeaturedBlogs();
  if (!featuresBlogs?.length) {
    return <></>;
  }
  return (
    <div className="featured-blogs">
      <Divider />
      <Section sectionClasses="featured-blogs-wrapper mt-100">
        <div className="featured-blog-header">
          <p>Blog</p>
          <div className="featured-blog-header-inner">
            <h2>Level Up Your Digital Skills</h2>
            <p>
              Practical tips, expert guides, and inspiration to enhance your web
              development journey.
            </p>
          </div>
          <div className="category-pill-wrapper">
            {blogCategories.map((category) => (
              <div className="category-pill ">
                <Link href={category.link}>{category.name}</Link>
              </div>
            ))}
          </div>
        </div>
      </Section>
      <Card featuresBlogs={featuresBlogs} />
      <Divider />
    </div>
  );
};

export default FeaturedBlogs;
