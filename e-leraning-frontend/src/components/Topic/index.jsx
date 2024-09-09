import dynamic from "next/dynamic";
import Footer from "./Footer";
import SideBar from "./SideBar";
import Section from "../shared/Section";
import TopicContent from "./TopicContent";
import { getAccessTokenCookies } from "@/services/server-action-cookies";
import { isProduction } from "@/utils/common";
import DesktopAds from "@/components/common/DesktopAds";
const InsertAds = dynamic(() => import("@/components/common/InsertAds"));

import TopicScript from "./TopicScripts";
import CoursesFooter from "@/components/CoursesFooter";
import MobileAds from "@/components/common/MobileAds";
import "./style.scss";

const Topic = async ({ topicData }) => {
  const accessToken = await getAccessTokenCookies();

  const isLoggedIn = Boolean(accessToken);
  const memberOnly = topicData?.details?.visibility_status == "member_only";

  return (
    <div className="detailpage" key={topicData}>
      <Section
        sectionClasses=""
        widthHandlerDivClasses="topic-main-page-wrapper"
      >
        <TopicScript topicId={topicData?.details?.id} />
        <div className="topic-main-page-container">
          <div className="topic-content-handler">
            <SideBar
              topicData={topicData}
              chapters={topicData?.course?.chapters}
            />
            <TopicContent
              showMemberSubscription={memberOnly && !isLoggedIn}
              topicData={topicData}
            />
            <DesktopAds adToRender="TopicPageRightSidebar" />
          </div>
        </div>
        {isProduction && (
          <InsertAds
            ChildComppnent="TopicPageInArticleInContentEnd"
            className={false}
          />
        )}
      </Section>
      {isProduction && <InsertAds ChildComppnent="TopicPageInContentATF" />}
      <MobileAds adToRender="SitewideMobileAdhesion" />
      <Footer
        topicData={topicData}
        chapters={topicData?.course?.chapters}
        className={topicData?.details?.is_editor && "editor-footer-position"}
      />
      {topicData?.details?.is_editor && (
        <CoursesFooter courseId={topicData?.course?.id} />
      )}
    </div>
  );
};

export default Topic;
