import React, { useState } from "react";
import "./style.scss";
import { useSession } from "next-auth/react";
import { postFeedback } from "@/services/feedback";
import Loading from "@/components/Loading";
import { toast } from "react-toastify";
import { colorDivs } from "@/utils/data";
const RatingForm = ({ setRatingModalOpen }) => {
  const { data: session } = useSession();
  const { accessToken, user } = session || {};

  const role = user?.role;
  const token = accessToken;
  const [message, setMessage] = useState("");
  const [feedback, setFeedback] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (feedback.trim() === "") {
      setError(true);
      return;
    }

    setIsLoading(true);
    setError(false);

    try {
      const response = await postFeedback(feedback, role, token);
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

    return () => {
      setFeedback("");
    };
  };

  return (
    <div className="feedback-form-container">
      <h3>Chapter 1. Overview of Website Development</h3>
      <p>How much useful was this chapter for you?</p>
      <div className="rating-icon-container">
        {colorDivs.map((item, index) => (
          <div
            key={index}
            className="rating-icon"
            style={{ backgroundColor: item.color }}
          >
            {item.text}
          </div>
        ))}
      </div>
      <div>
        <form onSubmit={handleSubmit}>
          <p>Let us know your feedback on this chapter</p>
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
          {error && <p style={{ color: "red" }}>Comment cannot be empty.</p>}
          <button className="rating-submit-button" type="submit">
            Send FeedBack
          </button>
        </form>
      </div>
      {isLoading && <Loading />}
    </div>
  );
};

export default RatingForm;
