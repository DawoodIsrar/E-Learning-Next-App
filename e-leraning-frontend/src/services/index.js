"use server";
import {
  GetDashboardDataWithAuthorization,
  GetDashboardDataWithAuthorizationByCourseSlug,
  getBookmarkedCourseTopics,
  getRecentlyViewCourseTopics,
} from "./dashboard";
import { getCourseSchemaBySlug } from "./course";
import { getTopicSchemaBySlug } from "./topic";
import { showAllBookmark } from "./bookmark";
import {
  getEditorChapterDetails,
  getEditorCourseDetails,
  getEditorTopicFeedback,
} from "./editor";
import { getAccessTokenCookies, getUserCookies } from "./server-action-cookies";
import { redirect } from "next/navigation";
import { getPostByID } from "./post";
import { courseDetailsBySlug } from "./course";
import {
  getBlogCategorySchemaBySlug,
  getBlogSchemaBySlug,
  getAllListPageDesignSchema,
} from "./blog";
import { getAllPublicationSchema } from "./publication";

export const getData = async (slug) => {
  const token = await getAccessTokenCookies();
  const user = await getUserCookies();
  const role = user && JSON.parse(user).role;

  let bookmarkResponse = null;
  let recentlyViewedTopics = null;
  let bookmarkedTopics = null;
  let guideResponse;

  try {
    guideResponse = await GetDashboardDataWithAuthorizationByCourseSlug(
      slug,
      role,
      token
    );
    if (!guideResponse.data) {
      redirect("/404");
    }
  } catch (error) {
    redirect("/404");
  }

  if (token) {
    bookmarkResponse = await showAllBookmark(role, token);
  }

  if (token && guideResponse?.data?.unique_identifier) {
    recentlyViewedTopics = await getRecentlyViewCourseTopics(
      role,
      token,
      guideResponse?.data?.unique_identifier
    );
    bookmarkedTopics = await getBookmarkedCourseTopics(
      role,
      token,
      guideResponse?.data?.unique_identifier
    );
  }

  return {
    props: {
      data: guideResponse?.data || null,
      courseSlugData: guideResponse.data,
      bookmarks: bookmarkResponse,
      recentlyViewedTopics,
      bookmarkedTopics,
    },
  };
};

export const getCourseSchema = async (slug) => {
  try {
    return await getCourseSchemaBySlug(slug);
  } catch (error) {
    console.log(error);
  }
};
export const getTopicSchema = async (slug) => {
  try {
    return await getTopicSchemaBySlug(slug);
  } catch (error) {
    console.log(error);
  }
};

export const getBlogCategorySchema = async (slug) => {
  try {
    return await getBlogCategorySchemaBySlug(slug);
  } catch (error) {
    console.log(error);
  }
};

export const getBlogSchema = async (slug) => {
  try {
    return await getBlogSchemaBySlug(slug);
  } catch (error) {
    console.log(error);
  }
};

export const getPublicationSchema = async () => {
  try {
    return await getAllPublicationSchema();
  } catch (error) {
    console.log(error);
  }
};

export const getListPageDesignSchema = async () => {
  try {
    return await getAllListPageDesignSchema();
  } catch (error) {
    console.log(error);
  }
};

export const getChapterDetail = async (chapterId) => {
  const token = await getAccessTokenCookies();

  const response = await getEditorChapterDetails(token, chapterId);

  if (response?.result === "ok") {
    const resData = response?.data?.data;
    const { unique_identifier, name, visibility_status } = resData;
    return {
      adminChapterId: unique_identifier
        .toString()
        ?.replace(/(\d{4})(\d{2})(\d{2})/, "$1-$2-$3")
        ?.split("-")?.[2],
      chapterTitle: name,
      chapterAccess: visibility_status,
    };
  }
};

export const getCourseDetails = async (courseId) => {
  const token = await getAccessTokenCookies();
  const response = await getEditorCourseDetails(token, courseId);
  if (response?.result === "ok") {
    const resData = response?.data?.data;
    return {
      adminCourseId: resData?.unique_identifier
        .toString()
        ?.replace(/(\d{4})(\d{2})/, "$1-$2")
        ?.split("-"),
      courseDetails: resData,
    };
  }
};

export const getCourseDetailsBySlug = async (courseSlug) => {
  const token = await getAccessTokenCookies();
  const response = await courseDetailsBySlug(token, courseSlug);
  if (response?.result === "ok") {
    const resData = response?.data?.data;
    return {
      courseDetails: resData,
    };
  }
};

const getTopicDetails = async (slug, accessToken, role) => {
  const res = await getPostByID(slug, accessToken, role);
  let tempData = { ...res?.data };
  if (res?.data?.is_editor) {
    const feedback = await getEditorTopicFeedback(accessToken, res?.data?.id);
    tempData = { ...res?.data, feedback: feedback };
  }
  return tempData;
};
export const getTopicData = async (slug) => {
  let details;
  let content;
  let previousDetails;
  let nextDetails;
  let topicChapterName;
  let course;

  const accessToken = await getAccessTokenCookies();
  const user = await getUserCookies();
  const role = user && JSON.parse(user)?.role;

  if (slug) {
    details = await getTopicDetails(slug, accessToken, role);

    content = details?.content;
    if (details?.previous_topic?.topic_slug) {
      previousDetails = await getTopicDetails(
        details.previous_topic.topic_slug,
        accessToken,
        role
      );
    }
    if (details?.next_topic?.topic_slug) {
      nextDetails = await getTopicDetails(
        details.next_topic.topic_slug,
        accessToken,
        role
      );
    }

    const courseRes = await GetDashboardDataWithAuthorization(
      details?.course_unique_identifier,
      role,
      accessToken
    );
    const chapIdentifier = details?.unique_identifier?.slice(0, 8);
    const chapter = courseRes?.data?.chapters?.find(
      (chapter) => chapter?.unique_identifier === chapIdentifier
    );
    topicChapterName = chapter?.name;
    course = courseRes?.data;
  }
  return {
    details,
    content,
    previousDetails,
    nextDetails,
    topicChapterName,
    course,
  };
};
