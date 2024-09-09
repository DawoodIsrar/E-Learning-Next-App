import "./style.scss";
import CategoryTabs from "./CategoryTab";
import BlogCard from "./BlogCard";
import Section from "@/components/shared/Section";

const MainPageBlog = () => {
  return (
    <Section
      sectionClasses={"blog-wrapper"}
      widthHandlerDivClasses={"blog-outer-box"}
    >
      <div className="blog-text-heading">
        <p className="blog-p"> Blog</p>
        <h1 className="blog-heading"> Short Heading Goes Here </h1>
        <p className="blog-sub-heading">
          " " Lorim Ipsum dummy text here for the sub title
        </p>
      </div>

      <div className="tabs-wrapper">
        <CategoryTabs />
      </div>
      <div className="blogs-card-wrapper">
        <BlogCard />
        <BlogCard />
        <BlogCard />
      </div>
    </Section>
  );
};

export default MainPageBlog;
