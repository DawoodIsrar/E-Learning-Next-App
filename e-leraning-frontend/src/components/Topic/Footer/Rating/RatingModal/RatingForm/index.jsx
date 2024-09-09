"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import Loading from "@/components/Loading";
import { colorDivs } from "@/utils/data";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { Rating } from "react-simple-star-rating";
import { topicFeedback, courseFeedback } from "@/services/feedback";
import HeaderRightArrow from "@/assets/icons/ChevronRightLight";
import "./style.scss";

const RatingForm = ({ setRatingModalOpen, courseData }) => {
  const pathname = usePathname();
  const [starModal, setStarModal] = useState(
    !!(pathname.length && pathname.split("/")[1].includes("course"))
  );
  const { data: session } = useSession();
  const { accessToken, user } = session || {};

  const role = user?.role;
  const token = accessToken;
  const [message, setMessage] = useState("");
  const [feedback, setFeedback] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [rating, setRating] = useState(0);

  const selectRatingValue = (item) => {
    setRating(item.text);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (feedback.trim() === "") {
      setError(true);
      return;
    }
    if (rating < 1) {
      setError(true);
      return;
    }

    setIsLoading(true);
    setError(false);

    if (starModal) {
      const id = courseData?.course ? courseData?.course?.id : courseData.id;
      try {
        const response = await courseFeedback(
          id,
          rating,
          feedback,
          role,
          token
        );
        if (response?.status) {
          toast.success("Feedback submitted successfully!");
          setMessage(response?.message);
          setFeedback("");
          setTimeout(() => {
            setRatingModalOpen(false);
          }, 2000);
        } else {
          toast.error("Failed to submit feedback. Please try again.");
        }
      } catch (error) {
        toast.error("An error occurred. Please try again.");
      } finally {
        setIsLoading(false);
      }
    } else {
      try {
        const response = await topicFeedback(
          courseData?.details?.id ?? courseData?.id,
          rating,
          feedback,
          role,
          token
        );
        if (response?.status) {
          toast.success("Feedback submitted successfully!");
          setMessage(response?.message);
          setFeedback("");
          setTimeout(() => {
            setRatingModalOpen(false);
          }, 2000);
        } else {
          toast.error("Failed to submit feedback. Please try again.");
        }
      } catch (error) {
        toast.error("An error occurred. Please try again.");
      } finally {
        setIsLoading(false);
      }
    }

    return () => {
      setFeedback("");
      setRating(0);
    };
  };

  return (
    <div className="feedback-form-container">
      <h3>
        {starModal
          ? courseData?.course
            ? courseData?.course?.name
            : courseData.name
          : courseData?.details?.name ?? courseData?.name}
      </h3>
      <p>
        How much useful was this{" "}
        {starModal
          ? "course"
          : pathname.includes("chapter")
          ? "chapter"
          : "topic"}{" "}
        for you?
      </p>

      {starModal ? (
        <div className="star-wrapper">
          <Rating onClick={(n) => setRating(n)} initialValue={rating} />
        </div>
      ) : (
        <div className="rating-icon-container">
          {colorDivs?.map((item, index) => (
            <div
              name={item.text}
              key={item.text}
              className={`rating-icon ${rating == item.text ? "selected" : ""}`}
              onClick={() => selectRatingValue(item)}
              style={{ backgroundColor: item.color }}
            >
              {item.text}
            </div>
          ))}
        </div>
      )}
      <div>
        <form onSubmit={handleSubmit}>
          <p>
            Let us know your feedback on this {starModal ? "course" : "chapter"}
          </p>
          <textarea
            onChange={(e) => {
              setError(false);
              setFeedback(e.target.value);
            }}
            placeholder="Write your feedback here"
            type="text"
            value={feedback}
            className={error ? "error" : ""}
          />
          {error && (
            <p style={{ color: "red" }}>Comment/Rating cannot be empty.</p>
          )}
          <button className="rating-submit-button" type="submit">
            Send FeedBack
          </button>
        </form>
      </div>
      {isLoading && <Loading />}
      {starModal ? (
        // <div className="switch-modal-div" onClick={() => setStarModal(false)}>
        //   Rate this Chapter{" "}
        //   <Image
        //     src={ArrowRight.src}
        //     alt="right arrow"
        //     height={24}
        //     width={24}
        //   />
        // </div>
        ""
      ) : (
        <div
          className="switch-modal-div"
          onClick={() => {
            setStarModal(true);
            setFeedback("");
            setRating(0);
          }}
        >
          <p>Rate this Course</p>

          <HeaderRightArrow width="24" height="24" />
        </div>
      )}
    </div>
  );
};

export default RatingForm;
