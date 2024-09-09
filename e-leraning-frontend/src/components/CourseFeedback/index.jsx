"use client";
import UserFeedbacks from "@/components/UserFeedbacks";
import CoursesFooter from "@/components/CoursesFooter";
import ArrowBack from "@mui/icons-material/ArrowBack";
import { Rating } from "react-simple-star-rating";
import { useEffect, useState } from "react";
import "@/assets/scss/CoursesFeedback.scss";
import "@/assets/scss/CourseStructure.scss";
import {
  getEditorCourseDetails,
  getEditorCourseFeedback,
  getEditorCourseTopicsFeedback,
  getEditorCourseChapterFeedback,
} from "@/services/editor";
import { useSession } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

const RatingBar = ({ star, rating, totalCount }) => {
  const style = {
    width: `${totalCount > 0 ? (rating / totalCount) * 100 : 0}%`,
    borderTopRightRadius: rating === 100 ? "inherit" : 0,
    borderBottomRightRadius: rating === 100 ? "inherit" : 0,
  };
  return (
    <div className="courseFeedback_rating">
      <span>{star} Star</span>
      <div className="courseFeedback_ratingBar">
        <div style={style} />
      </div>
    </div>
  );
};

const CoursesFeedback = () => {
  const router = useRouter();
  const { id } = useParams();

  const { data: session } = useSession();
  const { accessToken } = session || {};
  const token = accessToken;

  const [courseDetails, setCourseDetails] = useState({});
  const [courseFeedback, setCourseFeedback] = useState({});
  const [courseAuthor, setCourseAuthor] = useState("");
  const [courseTopicsRatings, setCourseTopicsRatings] = useState([]);
  const [courseChaptersRatings, setCourseChaptersRatings] = useState([]);
  const [activeTab, setActiveTab] = useState("course");

  const getCourseFeedback = async () => {
    const response = await getEditorCourseFeedback(token, id);
    setCourseFeedback(response);
  };

  const getCourseTopicsFeedback = async () => {
    const res = await getEditorCourseTopicsFeedback(token, id);
    setCourseTopicsRatings(res);
  };

  const getChapterFeedbacks = async () => {
    const res = await getEditorCourseChapterFeedback(token, id);
    setCourseChaptersRatings(res);
  };

  const getCourseDetails = async () => {
    const response = await getEditorCourseDetails(token, id);
    const resData = response?.data?.data;
    setCourseDetails(resData);
    for (let i = 0; i < resData?.editors?.length; i++) {
      if (resData?.editors?.[i]?.is_lead) {
        setCourseAuthor(resData?.editors?.[i]?.editor);
        return;
      }
    }
  };

  useEffect(() => {
    if (id && token) {
      getCourseFeedback();
      getCourseDetails();
      getCourseTopicsFeedback();
      getChapterFeedbacks();
    }
  }, [id, token]);

  return (
    <div>
      <Link href="/course-list" className="hide_link_style">
        <button className="back_button">
          <ArrowBack className="backbutton_icon" />{" "}
          <span className="backbutton_text">Back</span>
        </button>
      </Link>
      <div className="courseFeedback">
        <div className="courseContainer">
          <div className="courseStructureHeader">
            <div className="courseStructureHeader_Heading">
              <span className="courseStructureHeader_HeadingLineLeft" />
              <div>Course Feedback</div>
              <span className="courseStructureHeader_HeadingLineRight" />
            </div>

            <div className="courseFeedbackHeader">
              <div>
                <div className="courseFeedbackHeader_Heading">
                  <div className="courseFeedbackHeader_HeadingIcon">
                    <Image
                      src={courseDetails?.icon_url}
                      alt={courseDetails?.name}
                      width={80}
                      height={80}
                    />
                  </div>

                  <h4>{courseDetails?.name}</h4>
                </div>
                <div className="courseFeedbackHeader_Author">
                  Author: {courseAuthor}
                </div>
              </div>

              <div className="courseFeedbackHeader_ratingContainer">
                <div className="courseFeedbackHeader_ratingValue">
                  <h4>{courseDetails?.stats?.average_rating}</h4>
                  <Rating
                    initialValue={courseDetails?.stats?.average_rating}
                    readonly
                    emptyColor="#C4C4C4"
                    fillColor="#FFAA1D"
                    allowFraction
                    size={16}
                  />
                  <span>({courseDetails?.stats?.total_count})</span>
                </div>
                <div className="courseFeedback_ratingContainer">
                  <RatingBar
                    star={5}
                    rating={courseDetails?.stats?.rating_5}
                    totalCount={courseDetails?.stats?.total_count}
                  />
                  <RatingBar
                    star={4}
                    rating={courseDetails?.stats?.rating_4}
                    totalCount={courseDetails?.stats?.total_count}
                  />
                  <RatingBar
                    star={3}
                    rating={courseDetails?.stats?.rating_3}
                    totalCount={courseDetails?.stats?.total_count}
                  />
                  <RatingBar
                    star={2}
                    rating={courseDetails?.stats?.rating_2}
                    totalCount={courseDetails?.stats?.total_count}
                  />
                  <RatingBar
                    star={1}
                    rating={courseDetails?.stats?.rating_1}
                    totalCount={courseDetails?.stats?.total_count}
                  />
                </div>
              </div>
            </div>
          </div>

          <UserFeedbacks
            courseFeedback
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            feedback={
              activeTab === "course"
                ? courseFeedback
                : activeTab === "topic"
                ? courseTopicsRatings
                : courseChaptersRatings
            }
          />
        </div>

        <CoursesFooter className="mt-16" courseId={id} />
      </div>
    </div>
  );
};

export default CoursesFeedback;
