import  { useState } from "react";
import { useSession } from "next-auth/react";
import { postFeedback } from "@/services/feedback";
import Loading from "@/components/Loading";
import {  toast } from "react-toastify";
import "./style.scss";

const FeedbackForm = ({ setShowFeedBackModal }) => {
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
          setShowFeedBackModal(false);
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
    <>
      <div className="feedback-form-container">
        <h3>Send Feedback or Enquiry</h3>
        <p>
          Let us know how we can improve D-Libro! If you have a feature request,
          can you also share how you would use it and why it's important to you?
        </p>
        <div>
          <p>Comments</p>
          <form onSubmit={handleSubmit}>
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
            <button type="submit">Send FeedBack</button>
          </form>
        </div>
        {isLoading && <Loading />}
      </div>
    </>
  );
};

export default FeedbackForm;
