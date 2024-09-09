"use server";
import { URL, endpoints } from "@/utils/endpoints";
import AppService from "@/utils/api_helper";
import { revalidatePath } from "next/cache";

export const getCourseChapterList = async (token, id) => {
  try {
    const response = await AppService({
      url: URL + endpoints.GET_EDITOR_COURSE_CHAPTER_LIST + id,
      method: "get",
      token,
    });
    return response?.data?.data;
  } catch (error) {
    console.log(error);
  }
};

export const getEditorCourseDetails = async (token, id) => {
  try {
    const response = await AppService({
      url: URL + endpoints.GET_EDITOR_COURSE_DETAILS + id,
      method: "get",
      token,
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const getEditorTopicsList = async (token, id) => {
  try {
    const response = await AppService({
      url: URL + endpoints.GET_EDITOR_COURSE_TOPICS_LIST + id,
      method: "get",
      token,
    });
    return response?.data?.data;
  } catch (error) {
    console.log(error);
  }
};

export const getEditorChapterDetails = async (token, id) => {
  try {
    const response = await AppService({
      url: URL + endpoints.GET_EDITOR_CHAPTER_DETAIL + id,
      method: "get",
      token,
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const updateEditorChapterDetails = async (token, data) => {
  try {
    const response = await AppService({
      url: URL + endpoints.UPDATE_EDITOR_CHAPTER_DETAIL,
      method: "PUT",
      params: data,
      token,
    });

    return response;
  } catch (error) {
    return error;
  }
};

export const addEditorChapter = async (token, data) => {
  try {
    const response = await AppService({
      url: URL + endpoints.UPDATE_EDITOR_CHAPTER_DETAIL,
      method: "POST",
      params: data,
      token,
    });

    return response;
  } catch (error) {
    return error?.response?.data;
  }
};

export const getEditorTopicDetails = async (token, id) => {
  try {
    const response = await AppService({
      url: URL + endpoints.GET_EDITOR_TOPIC_DETAIL + id,
      method: "get",
      token,
    });
    return response?.data?.data;
  } catch (error) {
    console.log(error);
  }
};

export const updateEditorTopicDetails = async (token, formData) => {
  try {
    const response = await AppService({
      url: URL + endpoints.UPDATE_EDITOR_TOPIC_DETAIL,
      method: "PUT",
      form: formData,
      token,
    });
    revalidatePath("page");

    return response?.data?.data;
  } catch (error) {
    console.log("err", error);
    return error?.response?.data;
  }
};

export const addEditorTopicDetails = async (token, formData) => {
  try {
    const response = await AppService({
      url: URL + endpoints.UPDATE_EDITOR_TOPIC_DETAIL,
      method: "POST",
      form: formData,
      token,
    });
    return response;
  } catch (error) {
    return error?.response?.data;
  }
};

export const getEditorCourseFeedback = async (token, id) => {
  try {
    const response = await AppService({
      url: URL + endpoints.GET_EDITOR_COURSE_FEEDBACK + id,
      method: "get",
      token,
    });
    return response?.data?.data;
  } catch (error) {
    console.log(error);
  }
};

export const getEditorCourseTopicsFeedback = async (token, id) => {
  try {
    const response = await AppService({
      url: URL + endpoints.GET_EDITOR_COURSE_TOPICS_FEEDBACK + id,
      method: "get",
      token,
    });
    return response?.data?.data;
  } catch (error) {
    console.log(error);
  }
};

export const getEditorCourseChapterFeedback = async (token, id) => {
  try {
    const response = await AppService({
      url: URL + endpoints.GET_EDITOR_CHAPTER_FEEDBACK + id,
      method: "get",
      token,
    });
    return response?.data?.data;
  } catch (error) {
    console.log(error);
  }
};

export const topicMassAction = async (token, ids, action) => {
  try {
    const response = await AppService({
      url: URL + endpoints.TOPIC_MASS_ACTION,
      method: "POST",
      params: {
        ids: JSON.stringify(ids),
        action,
      },
      token,
    });

    return response?.data;
  } catch (error) {
    return error?.response?.data;
  }
};

export const courseMassAction = async (token, ids, action) => {
  try {
    const response = await AppService({
      url: URL + endpoints.COURSE_MASS_ACTION,
      method: "POST",
      params: {
        ids: JSON.stringify(ids),
        action,
      },
      token,
    });

    return response?.data;
  } catch (error) {
    return error?.response?.data;
  }
};

export const chapterMassAction = async (token, ids, action) => {
  try {
    const response = await AppService({
      url: URL + endpoints.CHAPTER_MASS_ACTION,
      method: "POST",
      params: {
        ids: JSON.stringify(ids),
        action,
      },
      token,
    });

    return response;
  } catch (error) {
    return error?.response?.data;
  }
};

export const updateEditorCourseIcon = async (token, formData) => {
  try {
    const response = await AppService({
      url: URL + endpoints.UPDATE_COURSE_ICON,
      method: "POST",
      form: formData,
      token,
    });

    return response?.data?.data;
  } catch (error) {
    return error?.response?.data;
  }
};

export const updateEditorCourseCover = async (token, formData) => {
  try {
    const response = await AppService({
      url: URL + endpoints.UPDATE_COURSE_COVER,
      method: "POST",
      form: formData,
      token,
    });

    return response?.data?.data;
  } catch (error) {
    return error?.response?.data;
  }
};

export const getEditorTopicFeedback = async (token, id) => {
  try {
    const response = await AppService({
      url: URL + endpoints.GET_EDITOR_TOPIC_FEEDBACK + id,
      method: "get",
      token,
    });
    return response?.data?.data;
  } catch (error) {
    console.log(error);
  }
};
