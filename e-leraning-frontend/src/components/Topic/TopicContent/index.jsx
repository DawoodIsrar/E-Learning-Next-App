import TopicTags from "./Tags";
import Image from "next/image";
import TopicBreadcrumbs from "./Banner";
import EditorButtons from "./EditorButtons";
import Bookmark from "../../common/Bookmark";
import PrismClient from "@/components/common/Prism";
import SubscriptionCard from "./SubscriptionCard";
import ColorChanger from "./ColorChanger";
import { dataBlurUrl } from "@/utils/data";
import parse from "html-react-parser";
import "./style.scss";

const TopicContent = async ({ topicData, showMemberSubscription }) => {
  const data = topicData && topicData?.content ? topicData.content : "";
  const parsedData = await parse(data);
  return (
    <div className="topic-page-content">
      <PrismClient />
      <ColorChanger topicData={topicData} />
      <TopicBreadcrumbs topicData={topicData} />
      {topicData?.details?.is_editor && <EditorButtons topicData={topicData} />}

      <div className="main-title">
        <h1>{topicData?.details?.h1_title}</h1>
        <Bookmark
          topicId={topicData?.details?.id}
          bookmarkValue={topicData?.details?.bookmark_list || []}
        />
      </div>
      <Image
        alt={topicData?.details?.img_alt}
        src={topicData?.details?.main_figure_url}
        width={700}
        height={525}
        className="topic-image"
        blurDataURL={dataBlurUrl}
        priority={true}
        placeholder="blur"
      />
      {showMemberSubscription ? (
        <div suppressHydrationWarning={true} className="editor-content">
          {parsedData}
        </div>
      ) : (
        <div
          dangerouslySetInnerHTML={{ __html: data }}
          suppressHydrationWarning={true}
          className="editor-content"
        />
      )}
      {showMemberSubscription ? (
        <SubscriptionCard />
      ) : (
        <TopicTags topicData={topicData} />
      )}
    </div>
  );
};

export default TopicContent;
