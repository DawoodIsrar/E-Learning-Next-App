import { URL, endpoints } from "@/utils/endpoints";
import AppService from "@/utils/api_helper";

export const postFeedback = async (feedback, role, token) => {
  const formData = new FormData();
  formData.append("role", role);
  formData.append("comment", feedback);
  try {
    const response = await AppService({
      url: `${URL}${endpoints.ADD_FEEDBACK}`,
      method: "POST",
      form: formData,
      token,
    });

    return response?.data;
  } catch (error) {
    console.log(error);
  }
};

export const courseFeedback = async (
  courseId,
  rating,
  feedback,
  role,
  token,
  isDeleting = false
) => {
  const formData = new FormData();
  formData.append("course_id", courseId);
  formData.append("role", role);
  if (!isDeleting) {
    formData.append("rating", rating);
    formData.append("comment", feedback);
  }

  try {
    const response = await AppService({
      url: `${URL}${endpoints.COURSE_FEEDBACK}`,
      method: "POST",
      form: formData,
      token,
    });

    return response?.data;
  } catch (error) {
    console.log(error);
  }
};

export const topicFeedback = async (
  topicId,
  rating,
  feedback,
  role,
  token,
  isDeleting = false
) => {
  const formData = new FormData();
  formData.append("topic_id", topicId);
  formData.append("role", role);

  if (!isDeleting) {
    formData.append("rating", rating);
    formData.append("comment", feedback);
  }

  try {
    const response = await AppService({
      url: `${URL}${endpoints.TOPIC_FEEDBACK}`,
      method: "POST",
      form: formData,
      token,
    });

    return response?.data;
  } catch (error) {
    console.log(error);
  }
};
