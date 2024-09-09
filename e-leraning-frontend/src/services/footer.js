import { URL, endpoints } from "@/utils/endpoints";
import AppService from "@/utils/api_helper";

export const memberCourses = async (token) => {
  try {
    const response = await AppService({
      url: URL + endpoints.GET_ALL_MEMBER_COURSES,
      method: "get",
      token,
    });
    return response?.data;
  } catch (error) {
    console.log(error);
  }
};
