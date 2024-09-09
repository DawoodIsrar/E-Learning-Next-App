import SpecificTopicList from "@/components/SpecificTopicList";
import HideFooter from "@/app/topic/[topic-slug]/hideFooter";
import "./style.scss";

export const metadata = {
  title: "Topic List - D-Libro | Digital Book Library for Web Skill Training",
};

const TopicListPage = () => {
  return (
    <>
      <HideFooter />
      <SpecificTopicList />
    </>
  );
};

export default TopicListPage;
