import TopicIcon from "@/assets/images/TopicIcon.svg";
import CrossRedIcon from "@/assets/images/CrossRed.svg";
import { courseMassAction, topicMassAction } from "@/services/editor";
import React, { useState } from "react";
import Image from "next/image";
import Modal from "../Modal";
import { useRouter } from "next/navigation";
import "./style.scss";

const TopicDeleteModal = ({
  setSelectedRowsCount = null,
  setSelectedRows = null,
  columns = null,
  setColumns = null,
  setAction = null,
  isOpen,
  setIsOpen,
  selectedRows = null,
  token,
  action = null,
  updateData = null,
  topicId = "",
  onDone = null,
  course,
}) => {
  const isLightTheme = "light";
  const [deleteWarning, setDeleteWarning] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    if (deleteWarning) {
      let Ids = [];
      if (selectedRows?.length) {
        selectedRows?.forEach((row) => Ids.push(row?.id));
      } else {
        Ids = [topicId];
      }
      const apiToCall = course ? courseMassAction : topicMassAction;

      const response = await apiToCall(token, Ids, "delete");
      if (response) {
        if (setSelectedRowsCount) {
          setSelectedRowsCount(0);
        }
        if (setSelectedRows) {
          setSelectedRows([]);
        }
        if (updateData) {
          updateData(false);
        }
        if (setColumns) {
          const tempColumns = [...columns];
          tempColumns[tempColumns?.length - 1] = {
            ...columns[tempColumns?.length - 1],
            checked: false,
          };
          setColumns([...tempColumns]);
        }
        if (setAction) {
          setAction("");
        }
      }
      if (onDone) {
        onDone();
      }

      setIsOpen(false);
    } else {
      setDeleteWarning(true);
    }
  };

  if (!isOpen) {
    return null;
  }
  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <div
        className={`topicDeleteModal ${
          isLightTheme ? "topicDeleteModal_light" : ""
        }`}
      >
        <h4>Delete {course ? "courses" : "topics"}</h4>
        {!deleteWarning ? (
          <>
            <div className="topicDeleteModal_icon">
              {!course && (
                <>
                  <Image src={TopicIcon} alt="topic icon" />
                  <Image src={CrossRedIcon} alt="cross red icon" />
                </>
              )}
            </div>
            <div className="topicDeleteModal_text">
              You are trying to delete{" "}
              {topicId ? (
                "this topic"
              ) : (
                <b>
                  {" "}
                  {selectedRows?.length} {course ? "courses" : "topics"}
                </b>
              )}
              .
            </div>
            <div className="topicDeleteModal_text">
              Are you sure you want to delete{" "}
              {course ? "this course" : topicId ? "this topic" : "these topics"}
              ?
            </div>
          </>
        ) : (
          <div className="topicDeleteModal_textWarning">
            {course
              ? selectedRows?.length > 1
                ? "These Courses"
                : "This Course"
              : topicId
              ? "This topic"
              : "These topics"}{" "}
            will be deleted immediately. You cannot undo this action.
          </div>
        )}

        <div className="topicDeleteModal_buttons">
          <button
            onClick={() => {
              setIsOpen(false);
              setDeleteWarning(false);
            }}
          >
            Cancel
          </button>
          <button onClick={handleDelete}>
            {isOpen ? (!deleteWarning ? "Delete" : "Confirm") : ""}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default TopicDeleteModal;
