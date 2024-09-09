import { URL, endpoints } from "@/utils/endpoints";
import AppService from "@/utils/api_helper";

export const getPostByID = async (slug, token, role) => {
  try {
    const response = await AppService({
      url: `${URL}${endpoints.GET_POST_BY_ID}topic_slug=${slug}&role=${role}`,
      method: "get",
      token,
    });
    return response?.data;
  } catch (error) {
    console.log(error);
  }
};
export const getPostByUniqueIdentifier = async (slug, token, role) => {
  try {
    const response = await AppService({
      url: `${URL}${endpoints.GET_POST_BY_ID}unique_identifier=${slug}&role=${role}`,
      method: "get",
      token,
    });
    return response?.data?.data;
  } catch (error) {
    console.log(error);
  }
};

export const addBrowseRecordApi = async (data, token) => {
  try {
    const response = await AppService({
      url: URL + endpoints.ADD_BROWSE_RECORD,
      method: "POST",
      params: data,
      token,
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
