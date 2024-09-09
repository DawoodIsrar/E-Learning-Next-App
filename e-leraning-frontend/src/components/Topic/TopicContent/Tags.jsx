import Link from "next/link";
import "./style.scss";

const TopicTags = ({ topicData }) => {
  const data = topicData?.details?.tags ?? topicData.tags;
  return (
    <div className="topic-tags">
      <p>Tags:</p>
      {data?.map((tag, index) => (
        <Link key={index} className="tag-body" href={`/tagPage/${tag}`}>
          <p key={index + tag}>{tag}</p>
        </Link>
      ))}
    </div>
  );
};

export default TopicTags;
