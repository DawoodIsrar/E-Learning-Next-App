import Topic from "@/components/Topic";
import { getTopicDataBySlug } from "@/services/topic";
import { getTopicData } from "@/services";
import { generateMetaTags } from "@/utils/metaTags";

export async function generateMetadata({ params }) {
  const slug = params["topic-slug"];
  const topicData = await getTopicData(slug);

  return generateMetaTags(
    topicData?.details?.meta_title,
    topicData?.details?.meta_description,
    topicData?.details?.tags?.join?.(", "),
    topicData?.details?.meta_description,
    `topic/${topicData?.details?.topic_slug}`,
    topicData?.details?.og_image_url
  );
}

const TopicPage = async ({ params }) => {
  const slug = params["topic-slug"];
  const topicData = await getTopicDataBySlug(slug);

  return <Topic topicData={topicData} key={topicData} />;
};

export default TopicPage;
