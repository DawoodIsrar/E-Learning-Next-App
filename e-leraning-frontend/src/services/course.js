import { URL, endpoints } from "@/utils/endpoints";
import AppService from "@/utils/api_helper";

export const getRecentlyViewCourses = async (role, token) => {
  try {
    const response = await AppService({
      url: URL + endpoints.GET_RECENTLY_VIEWED_COURSES + `?role=${role}`,
      method: "get",
      token,
    });

    return response?.data?.data;
  } catch (error) {
    console.log(error);
  }
};

export const getBookmarkedCourses = async (role, token) => {
  try {
    const response = await AppService({
      url: URL + endpoints.GET_BOOKMARKED_COURSES + `?role=${role}`,
      method: "get",
      token,
    });

    return response?.data?.data;
  } catch (error) {
    console.log(error);
  }
};

export const courseHistory = async (token, role) => {
  try {
    const response = await AppService({
      url: `${URL}${endpoints.GET_HISTORY_COURSE}?role=${role}`,
      method: "get",
      token,
    });

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const courseDetailsBySlug = async (token, slug) => {
  try {
    const response = await AppService({
      url: URL + endpoints.GET_COURSE_DETAILS_BY_SLUG + slug,
      method: "get",
      token,
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const getCourseSchemaBySlug = async (slug) => {
  try {
    const response = await AppService({
      url: URL + endpoints.GET_COURSE_SCHEMA_BY_SLUG + "?course_slug=" + slug,
      method: "get",
    });
    return response?.data;
  } catch (error) {
    console.log(error);
  }
};

export const getCourseEditorById = async (token, id) => {
  try {
    const response = await AppService({
      url: URL + endpoints.GET_COURSE_BY_ID + "/course?id=" + id,
      token,
      method: "get",
    });
    return response?.data;
  } catch (error) {
    console.log(error);
  }
};
export const updateCourseEditorById = async (token, formData) => {
  try {
    const response = await AppService({
      url: URL + endpoints.UPDATE_AND_ADD_COURSE + "/course-new",
      token,
      form: formData,
      method: "put",
    });
    return response?.error ? response.error : response?.data;
  } catch (error) {
    console.log(error);
  }
};
export const addCourseEditor = async (token, formData) => {
  try {
    const response = await AppService({
      url: URL + endpoints.UPDATE_AND_ADD_COURSE + "/course-new",
      token,
      form: formData,
      method: "post",
    });
    return response?.error ? response.error : response?.data;
  } catch (error) {
    console.log(error);
  }
};

export const getEditCourseCategories = async (token) => {
  try {
    const response = await AppService({
      url: URL + endpoints.UPDATE_AND_ADD_COURSE + "/get-all-categories",
      token,
      method: "get",
    });
    const data = response;
    return data;
  } catch (error) {
    console.log("error", error);
  }
};
export const getAllEditorCourse = async (token) => {
  try {
    const response = await AppService({
      url: URL + endpoints.UPDATE_AND_ADD_COURSE + "/get-all-courses",
      token,
      method: "get",
    });
    const data = response;
    return data;
  } catch (error) {
    console.log("error", error);
  }
};

export const getAllCourses = async () => {
  try {
    const response = await AppService({
      url: `${URL}${endpoints.GET_ALL_COURSES}`,
      method: "get",
    });
    return response?.data;
  } catch (error) {
    console.log("error", error);
  }
};
