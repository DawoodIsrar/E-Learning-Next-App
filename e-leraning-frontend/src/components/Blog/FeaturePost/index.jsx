import Post from "../Blogs";
import "./style.scss";

const FeaturePost = ({ blogData }) => {
  return (
    <div className="feature-posts">
      <Post blogs={blogData} main_title={"Feature Post"} divider={true} />
    </div>
  );
};

export default FeaturePost;
