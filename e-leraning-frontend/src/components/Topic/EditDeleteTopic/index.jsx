"use client";
import { useState } from "react";
import TopicDeleteModal from "../../TopicDeleteModal";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import "./style.scss";

const EditDeleteTopic = ({ detailsId, detailsCourseid, courseId }) => {
  const router = useRouter();
  const { data: session } = useSession();
  const { accessToken } = session || {};

  const [topicDeleteModalOpen, setTopicDeleteModalOpen] = useState(false);
  const handleOnDone = () => {
    router.push(`/topic-list/${courseId}`);
  };
  const handleDeleteTopic = async () => {
    setTopicDeleteModalOpen(true);
  };
  return (
    <>
      {topicDeleteModalOpen && (
        <TopicDeleteModal
          isOpen={topicDeleteModalOpen}
          setIsOpen={setTopicDeleteModalOpen}
          token={accessToken}
          onDone={handleOnDone}
          topicId={`${detailsId}`}
        />
      )}
      <div className="subcontainerdelet">
        <button className="detail-delete-btn" onClick={handleDeleteTopic}>
          Delete
        </button>
        <button
          className="detail-edit-btn"
          onClick={() =>
            router.push(`/add-topic/${detailsCourseid}/${detailsId}`)
          }
        >
          Edit
        </button>
      </div>
    </>
  );
};

export default EditDeleteTopic;
