import CategroryCard from "./CategoryCard";
import Section from "../shared/Section";
import Banner from "./Banner";
import "./style.scss";

const BlogCategories = ({ BlogCategoriesData }) => {
  return (
    <Section widthHandlerDivClasses="categories-wrapper">
      <Banner categoryTitle={BlogCategoriesData?.category?.category_title} />
      <h1>{BlogCategoriesData?.category?.h1_title}</h1>
      <p className="header-paragraph">
        {BlogCategoriesData?.category?.header_first_paragraph}
      </p>
      <div className="categories-cards-wrapper">
        {BlogCategoriesData?.blogs
          ?.sort((a, b) => a.position - b.position)
          ?.map((item, index) => (
            <CategroryCard blog={item} key={index} />
          ))}
      </div>
    </Section>
  );
};

export default BlogCategories;
