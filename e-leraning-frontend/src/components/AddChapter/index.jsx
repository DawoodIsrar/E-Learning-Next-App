"use client";
import ChapterDeleteModal from "@/components/ChapterDeleteModal";
import CoursesFooter from "@/components/CoursesFooter";
import ArrowBack from "@mui/icons-material/ArrowBack";
import { useEffect, useState } from "react";
import "@/assets/scss/AddChapterPage.scss";
import {
  addEditorChapter,
  chapterMassAction,
  updateEditorChapterDetails,
} from "@/services/editor";
import { CourseAccessTitles } from "@/utils";
import Loading from "@/components/Loading";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";

const AddChapter = ({
  chapterAccessProps,
  chapterTitleProps,
  adminChapterIdProps,
  adminCourseIdProps,
  courseDetailsProps,
  token,
}) => {
  const router = useRouter();
  const params = useParams();
  const { courseId, chapterId } = params;

  const [adminChapterId, setAdminChapterId] = useState(adminChapterIdProps);

  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState("");
  const [chapterTitle, setChapterTitle] = useState(chapterTitleProps);
  const [chapterAccess, setChapterAccess] = useState(chapterAccessProps);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [deleteChapterModalOpen, setDeleteChapterModalOpen] = useState(false);
  const [buttonValue, setButtonValue] = useState("");

  const updateChapterDetails = async () => {
    setError("");
    setUpdateLoading(true);
    const data = {
      id: chapterId,
      unique_identifier: `${adminCourseIdProps?.[0]}${adminCourseId?.[1]}${adminChapterId}`,
      name: chapterTitle,
      visibility_status: chapterAccess,
    };
    const response = await updateEditorChapterDetails(token, data);
    if (response?.result === "ok") {
      router.push(`/chapter-list/${courseId}`);
    }

    if (response.result === "error") {
      const errRes = response?.error?.error;
      setError(errRes?.[Object.keys(errRes)?.[0]]?.[0]);
    }

    setUpdateLoading(false);
  };

  const addChapter = async () => {
    setError("");
    setUpdateLoading(true);
    const data = {
      course_id: courseId,
      unique_identifier: `${adminCourseIdProps?.[0]}${adminCourseIdProps?.[1]}${adminChapterId}`,
      name: chapterTitle,
      visibility_status: chapterAccess,
    };
    const response = await addEditorChapter(token, data);
    if (response?.result === "ok") {
      router.push(`/chapter-list/${courseId}`);
    } else {
      const errRes = response?.error?.error;
      setError(errRes?.[Object.keys(errRes)?.[0]]?.[0]);
    }
    setUpdateLoading(false);
  };

  const handleDeleteChapter = async () => {
    setIsLoading(true);
    const response = await chapterMassAction(token, [`${chapterId}`], "delete");
    if (response?.result === "ok") {
      setIsLoading(false);
      router.push(`/chapter-list/${courseId}`);
    } else {
      setIsLoading(false);
      if (response?.error?.message === "Some chapters have topics") {
        setDeleteChapterModalOpen(true);
      }
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (chapterId !== "new") {
      updateChapterDetails();
    } else {
      addChapter();
    }
    setButtonValue(getButtonValue());
  };

  const getButtonValue = () => {
    if (chapterId !== "new") {
      if (updateLoading) {
        return "Updating...";
      }
      return "Update";
    } else {
      if (updateLoading) {
        return "Adding...";
      }
      return "Add";
    }
  };

  const handleback = () => {
    router.push(`/chapter-list/${courseId}`);
  };

  const handleAdminChapterId = (e) => {
    if (e.target.value?.length < 3) setAdminChapterId(e.target.value);
  };

  const handleChapterTitle = (e) => {
    setChapterTitle(e.target.value?.slice(0, 50));
  };

  const handleChapterAccess = (e) => {
    setChapterAccess(e.target.value);
  };

  useEffect(() => {
    setButtonValue(getButtonValue());
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <ChapterDeleteModal
        isOpen={deleteChapterModalOpen}
        setIsOpen={setDeleteChapterModalOpen}
      />
      <button onClick={handleback} className="back_button">
        <ArrowBack className="backbutton_icon" />{" "}
        <span className="backbutton_text">Back</span>
      </button>
      <div className="courseContainer">
        <div className="addChapter_topicName">
          {courseDetailsProps?.icon_url && (
            <div className="addChapter_topicNameIcon">
              <Image
                src={courseDetailsProps?.icon_url}
                alt="logo"
                height={48}
                width={48}
              />
            </div>
          )}
          {courseDetailsProps?.name}
        </div>
        <form onSubmit={handleFormSubmit} className="addChapter">
          <h4>Add or Edit a Chapter</h4>
          <div className="addChapter_input">
            <label htmlFor="identifier">UNIQUE IDENTIFIER</label>
            <div className="addChapter_identifierInputs">
              <input
                type="text"
                id="identifier"
                required
                value={`${adminCourseIdProps?.[0] || "--"}-${
                  adminCourseIdProps?.[1] || "--"
                }`}
                disabled
              />
              <b> – </b>
              <input
                type="text"
                id="identifier"
                required
                value={adminChapterId}
                onChange={handleAdminChapterId}
              />
            </div>
          </div>
          <div className="addChapter_input">
            <label htmlFor="title">CHAPTER TITLE</label>
            <input
              type="text"
              id="title"
              value={chapterTitle}
              required
              onChange={handleChapterTitle}
            />
          </div>
          <div className="addChapter_input">
            <label htmlFor="access">CHAPTER ACCESS</label>
            <select
              value={chapterAccess}
              onChange={handleChapterAccess}
              id="access"
            >
              {CourseAccessTitles.map((d, index) => (
                <option value={d.value} key={`d-${index}`}>
                  {d.name}
                </option>
              ))}
            </select>
          </div>
          <div className="addChapter_buttons">
            <button type="submit">{buttonValue}</button>
            {chapterId !== "new" && (
              <button onClick={handleDeleteChapter} type="button">
                Delete This Chapter
              </button>
            )}
          </div>
          {error && <span className="error">{error}</span>}
        </form>
      </div>

      <CoursesFooter className="mt-16" courseId={courseId} />
    </div>
  );
};

export default AddChapter;
