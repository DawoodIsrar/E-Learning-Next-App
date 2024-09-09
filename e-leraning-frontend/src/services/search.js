import { URL, endpoints } from "@/utils/endpoints";
import AppService from "@/utils/api_helper";
import { getUserCookies } from "@/services/server-action-cookies";

export const searchAction = async (query, courseId = "", token, role) => {
  try {
    const response = await AppService({
      url: `${URL}${endpoints.SEARCH_CONTENT}?q=${query}&course_unique_identifier=${courseId}&role=${role}`,
      method: "get",
      token,
    });
    return response?.data;
  } catch (error) {
    console.log(error);
  }
};

export const searchByCourse = async (token, query) => {
  try {
    const response = await AppService({
      url: `${URL}${endpoints.SEARCH_BY_COURSE}${query}`,
      method: "get",
      token,
    });

    return response?.data;
  } catch (error) {
    console.log(error);
  }
};

export const searchTag = async (query) => {
  const user = await getUserCookies();
  const parsedUser = user && JSON.parse(user);
  const role = parsedUser?.role;
  const token = parsedUser?.token;
  try {
    const response = await AppService({
      url: `${URL}${endpoints.SEARCH_BY_TAG}?role=${role}&t=${query}`,
      method: "get",
      token,
    });
    return response?.data;
  } catch (error) {
    console.log(error);
  }
};
