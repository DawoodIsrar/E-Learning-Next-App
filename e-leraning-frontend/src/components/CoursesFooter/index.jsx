"use client";
import FormatListBulletedOutlinedIcon from "@mui/icons-material/FormatListBulletedOutlined";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import FeedbackIcon from "@/assets/images/FeedbackIcon.svg";
import { usePathname } from "next/navigation";
import EditIcon from "@mui/icons-material/Edit";
import "./style.scss";
import Image from "next/image";
import Link from "next/link";

const CoursesFooter = ({ className, courseId = "" }) => {
  const pathname = usePathname();

  const handlePathname = (value) => {
    return pathname?.includes?.(value);
  };
  const disableMainEditor = handlePathname("/course-list/");
  const courseRoute =
    handlePathname("/course-list") || handlePathname("/course-edit");

  const disableCourseFeedback =
    handlePathname("/course-feedback/") || courseRoute || disableMainEditor;

  const disableChapterList =
    handlePathname("/chapter-list/") || courseRoute || disableMainEditor;

  const disableAddChapter =
    handlePathname("/add-chapter/") || courseRoute || disableMainEditor;

  const disableTopicList =
    handlePathname("/topic-list/") || courseRoute || disableMainEditor;

  const disableAddTopic =
    handlePathname("/add-topic/") || courseRoute || disableMainEditor;

  // const disableAddCourse = handlePathname("/course-edit");

  // const disableCourseList = handlePathname("/course-list");

  return (
    <footer className={`courses_footer ${className}`}>
      <Link href="/course-list">
        <button disabled={disableMainEditor}>
          <EditIcon />
          <span>Editor Main</span>
        </button>
      </Link>

      <Link href={`/course-feedback/${courseId}`}>
        <button disabled={disableCourseFeedback}>
          <Image src={FeedbackIcon} alt="feedback icon" />
          <span>Course Feedback</span>
        </button>
      </Link>

      <Link href={`/chapter-list/${courseId}`}>
        <button disabled={disableChapterList}>
          <FormatListBulletedOutlinedIcon />
          <span>Chapter List</span>
        </button>
      </Link>
      <Link href={`/add-chapter/${courseId}/new`}>
        <button disabled={disableAddChapter}>
          <AddCircleOutlineOutlinedIcon />
          <span> Add Chapter</span>
        </button>
      </Link>
      <Link href={`/topic-list/${courseId}`}>
        <button disabled={disableTopicList}>
          <FormatListBulletedOutlinedIcon />
          <span>Topic List</span>
        </button>
      </Link>

      <Link href={`/add-topic/${courseId}/new`}>
        <button disabled={disableAddTopic}>
          <AddCircleOutlineOutlinedIcon />
          <span> Add Topic</span>
        </button>
      </Link>
      {/* <Link href={`/course-edit/new`}>
        <button disabled={disableAddCourse}>
          <AddCircleOutlineOutlinedIcon />
          <span> Add Course</span>
        </button>
      </Link> */}
      {/* <Link href={`/course-list`}>
        <button disabled={disableCourseList}>
          <AddCircleOutlineOutlinedIcon />
          <span>Course List</span>
        </button>
      </Link> */}
    </footer>
  );
};

export default CoursesFooter;
