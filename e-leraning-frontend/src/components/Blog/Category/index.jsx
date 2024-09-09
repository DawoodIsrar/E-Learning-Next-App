import "./style.scss";
import DesktopViewBLogs from "../Blogs";
import CourseBlogCard from "../CourseBlogCard/CourseBlogCard";
import PostMainTitle from "../PostMainTitle";
import MobileViewBlog from "./MobileViewBlog";
import Divider from "../Blogs/Divider";

const Category = ({
  postMainTitle,
  courseBlogCardTitle,
  courseImg,
  imgLink,
  classname,
  bgColor,
  postData,
  buttonBgColor,
  category_slug,
  courseImgAlt,
}) => {
  return (
    <div className="category-blog-wrapper">
      <PostMainTitle
        title={postMainTitle}
        category_slug={category_slug}
        backgroundColor={bgColor}
      />
      <div className={`posts-and-card-container ${classname}`}>
        <CourseBlogCard
          title={courseBlogCardTitle}
          courseImg={courseImg}
          bgColor={bgColor}
          imgLink={imgLink}
          buttonBgColor={buttonBgColor}
          courseImgAlt={courseImgAlt}
        />
        <div className="category-post-div">
          <div className="mobile-view-blogs">
            <MobileViewBlog blogs={postData} />
          </div>
          <div className="web-view-blogs">
            <DesktopViewBLogs
              blogs={postData}
              divider={false}
              category_slug={category_slug}
            />
          </div>
        </div>
      </div>
      <Divider />
    </div>
  );
};

export default Category;
