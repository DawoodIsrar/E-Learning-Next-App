import IndexIcon from "@/assets/icons/IndexIcon";
import NonIndexIcon from "@/assets/icons/NonIndexIcon";
import WipIcon from "@/assets/icons/WIPIcon";
import PublicIcon from "@/assets/icons/Globe";
import MemberIcon from "@/assets/icons/TopiMemberIcon";
import EditMemberIcon from "@/assets/icons/EditMemberIcon";
import EditDeleteTopic from "../EditDeleteTopic";
import "./style.scss";

const EditorButtons = ({ topicData }) => {
  return (
    <div className="status-wrapper">
      <EditDeleteTopic
        detailsId={topicData?.details?.id}
        detailsCourseid={topicData?.details?.course_id}
        courseId={topicData?.course?.id}
      />
      <div className="status">
        {topicData?.details?.english_edit_status === "done" ? (
          <>
            <IndexIcon width={20} height={20} />
            <p>Eng edit</p>
          </>
        ) : topicData?.details?.english_edit_status === "not started" ? (
          <>
            <NonIndexIcon width={20} height={20} />
            <p>No Eng</p>
          </>
        ) : (
          <>
            <WipIcon width={20} height={20} />
            <p>Eng WIP</p>
          </>
        )}
      </div>
      <div className="status">
        {!topicData?.details?.index ? (
          <>
            <NonIndexIcon width={20} height={20} />
            <p>nonindex</p>
          </>
        ) : (
          <>
            <IndexIcon width={20} height={20} />
            <p>indexed</p>
          </>
        )}
      </div>
      <div className="status">
        {topicData?.details?.visibility_status === "public" ? (
          <PublicIcon width={25} height={25} />
        ) : topicData?.details?.visibility_status === "member_only" ? (
          <MemberIcon width={25} height={25} />
        ) : (
          <EditMemberIcon width={25} height={25} />
        )}
      </div>
    </div>
  );
};

export default EditorButtons;
