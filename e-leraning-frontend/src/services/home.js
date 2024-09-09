import { URL, endpoints } from "@/utils/endpoints";
import AppService from "@/utils/api_helper";

export const home = async (token) => {
  try {
    const response = await AppService({
      url: URL + endpoints.GET_MAIN_CATEGORY,
      method: "get",
      token,
    });
    return response?.data?.data;
  } catch (error) {
    console.log(error);
  }
};

export const allPublicCourses = async () => {
  try {
    const response = await AppService({
      url: URL + endpoints.GET_ALL_PUBLIC_COURSES,
      method: "get",
    });
    return response?.data;
  } catch (error) {
    console.log(error);
  }
};

export const allOpenEditorCourses = async (token) => {
  try {
    const response = await AppService({
      url: URL + endpoints.GET_ALL_OPEN_EDITOR_COURSES,
      method: "get",
      token,
    });
    return response?.data;
  } catch (error) {
    console.log(error);
  }
};

export const allFooterPages = async () => {
  try {
    const response = await AppService({
      url: URL + endpoints.GET_ALL_FOOTER_PAGES,
      method: "get",
    });
    return response?.data;
  } catch (error) {
    console.log(error);
  }
};
