import ProfileIconDark from "@/assets/images/ProfileIconDark.svg";
import ProfileIconLight from "@/assets/images/ProfileIconLight.svg";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Rating } from "react-simple-star-rating";
import Tooltip from "@mui/material/Tooltip";
import { getRelativeTime } from "@/utils";

import Image from "next/image";
import "./style.scss";

const UserFeedbacks = ({
  courseFeedback = false,
  feedback,
  activeTab = "",
  setActiveTab = () => {},
}) => {
  const isLightTheme = "light";
  const isSmallerScreen = useMediaQuery("(max-width: 767px)");

  const handleActiveTab = (e) => {
    setActiveTab(e.target.id);
  };

  return (
    <div
      className={`userFeedbacks ${
        courseFeedback ? "userFeedbacks_Course" : ""
      }`}
    >
      {courseFeedback && (
        <div className="userFeedbacks_tabs">
          <span
            id="course"
            className={`${
              activeTab === "course" ? "userFeedbacks_tabActive" : ""
            }`}
            onClick={handleActiveTab}
          >
            Course Feedback
          </span>
          <span
            id="chapter"
            className={`${
              activeTab === "chapter" ? "userFeedbacks_tabActive" : ""
            }`}
            onClick={handleActiveTab}
          >
            Chapter Feedback
          </span>
          <span
            id="topic"
            className={`${
              activeTab === "topic" ? "userFeedbacks_tabActive" : ""
            }`}
            onClick={handleActiveTab}
          >
            Topic Feedback
          </span>
        </div>
      )}
      {!courseFeedback && (
        <div className="userFeedbacks_heading">Feedback on this topic</div>
      )}

      <div
        className={`${courseFeedback ? "userFeedbacks_feedbackWrapper" : ""}`}
        style={
          courseFeedback && activeTab === "course"
            ? { marginTop: "37px" }
            : { overflow: "auto" }
        }
      >
        {courseFeedback && activeTab !== "course" && (
          <div className="userFeedbacks_header">
            <div />
            <div />
            <div>{activeTab === "topic" ? "Topic" : "Chapter"} </div>
            <div>Comment</div>
          </div>
        )}
        {feedback.length > 0 ? (
          feedback?.map?.((feedback, i) => (
            <div key={i} className="userFeedbacks_feedback">
              {!feedback?.user?.icon_url ||
              feedback?.user?.icon_url?.includes?.("dummy") ? (
                <Image
                  src={!isLightTheme ? ProfileIconDark : ProfileIconLight}
                  alt="profile"
                  width={78}
                  height={78}
                />
              ) : (
                <Image
                  src={feedback?.user?.icon_url}
                  alt="feedback profile"
                  width={78}
                  height={78}
                  className={`${
                    !isLightTheme
                      ? "userFeedbacks_feedbackDarkImage"
                      : "userFeedbacks_feedbackLightImage"
                  } `}
                />
              )}
              <div
                className={`userFeedbacks_feedbackMain ${
                  courseFeedback ? "userFeedbacks_feedbackMainCourse" : ""
                }`}
              >
                <Tooltip title={feedback?.user?.username} placement="top-start">
                  <span>{feedback?.user?.username}</span>
                </Tooltip>
                {courseFeedback && activeTab === "course" ? (
                  <Rating
                    initialValue={feedback?.rating}
                    readonly
                    emptyColor="#C4C4C4"
                    fillColor="#FFAA1D"
                    allowFraction
                    size={isSmallerScreen ? 18 : 20}
                  />
                ) : (
                  <div>
                    {[1, 2, 3, 4, 5]?.map?.(
                      (rate) => feedback?.rating >= rate && <div>{rate}</div>
                    )}
                  </div>
                )}
                <span>{getRelativeTime(feedback.updated_on)}</span>
              </div>
              {courseFeedback && activeTab !== "course" && (
                <div className="userFeedbacks_feedbackTopicName">
                  {feedback?.topic_name || feedback?.chapter_name}
                </div>
              )}
              <div className="userFeedbacks_feedbackContent">
                "{feedback?.comment}"
              </div>
            </div>
          ))
        ) : (
          <h3 style={{ textAlign: "center" }}>No Data Found.</h3>
        )}
      </div>
    </div>
  );
};

export default UserFeedbacks;
