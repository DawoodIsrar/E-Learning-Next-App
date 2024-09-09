import { URL, endpoints } from "@/utils/endpoints";
import AppService from "@/utils/api_helper";

export const GetDashboardDataWithAuthorization = async (
  uniqueIdentifier,
  role,
  token
) => {
  try {
    const response = await AppService({
      url:
        URL +
        endpoints.DASHBOARD_DATA_WITH_AUTHORIZATION +
        role +
        "&unique_identifier=" +
        uniqueIdentifier,
      method: "get",
      token,
    });
    return response?.data;
  } catch (error) {
    console.log(error);
  }
};

export const GetDashboardDataWithAuthorizationByCourseSlug = async (
  slug,
  role,
  token
) => {
  try {
    const response = await AppService({
      url:
        URL +
        endpoints.DASHBOARD_DATA_WITH_AUTHORIZATION_BY_COURSE_SLUG +
        role +
        "&course_slug=" +
        slug,
      method: "get",
      token,
    });
    return response?.data;
  } catch (error) {
    console.log(error);
  }
};

export const getRecentlyViewCourseTopics = async (
  role,
  token,
  courseUniqueIdentifier
) => {
  try {
    const response = await AppService({
      url:
        URL +
        endpoints.GET_RECENTLY_VIEWED_COURSE_TOPICS +
        `?role=${role}&course_unique_identifier=${courseUniqueIdentifier}`,
      method: "get",
      token,
    });

    return response?.data?.data;
  } catch (error) {
    console.log(error);
  }
};

export const getBookmarkedCourseTopics = async (
  role,
  token,
  courseUniqueIdentifier
) => {
  try {
    const response = await AppService({
      url:
        URL +
        endpoints.GET_BOOKMARKED_COURSE_TOPICS +
        `?role=${role}&course_unique_identifier=${courseUniqueIdentifier}`,
      method: "get",
      token,
    });

    return response?.data?.data;
  } catch (error) {
    console.log(error);
  }
};
