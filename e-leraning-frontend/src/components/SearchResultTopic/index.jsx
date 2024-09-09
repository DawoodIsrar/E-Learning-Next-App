import TopicSearchResult from "./TopicSearchResult";
import Banner from "./Banner";
import CourseButtons from "./../Course/Buttons";
import "./style.scss";

const SearchResultTopic = ({ data, query, tag }) => {
  return (
    <div>
      <Banner />
      <TopicSearchResult data={data} query={query} tag={tag} />
      <CourseButtons ratingModal={false} />
    </div>
  );
};

export default SearchResultTopic;
