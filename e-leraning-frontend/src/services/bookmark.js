import { URL, endpoints } from "@/utils/endpoints";
import AppService from "@/utils/api_helper";

export const addBookmark = async (rawData, token) => {
  try {
    const response = await AppService({
      url: `${URL}${endpoints.ADD_BOOKMARK_LIBRARY}`,
      method: "POST",
      form: rawData,
      token,
    });

    return response;
  } catch (error) {
    console.log(error);
  }
};

export const showAllBookmark = async (role, token) => {
  try {
    const response = await AppService({
      url: `${URL}${endpoints.GET_ALL_BOOKMARK}?role=${role}`,
      method: "get",
      params: "",
      headers: {},
      form: null,
      token,
    });
    return response?.data?.data;
  } catch (error) {
    console.log(error);
  }
};

export const addContentBookmark = async (
  topic_id,
  bookmark_list_id,
  role,
  token
) => {
  const formData = new FormData();
  formData.append("topic_id", topic_id);
  if (bookmark_list_id >= 0) {
    formData.append("bookmark_list_id", bookmark_list_id);
  }
  formData.append("role", role);
  try {
    const response = await AppService({
      url: `${URL}${endpoints.UPDATE_BOOKMARK_TOPIC}`,
      method: "POST",
      form: formData,
      token,
    });

    return response?.data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteBookmark = async (role, bookmarkID, token) => {
  try {
    const response = await AppService({
      url: `${URL}${endpoints.DELETE_BOOKMARK}`,
      method: "delete",
      params: {
        id: bookmarkID,
        role,
      },
      token,
    });

    return response?.data;
  } catch (error) {
    console.log(error);
  }
};

export const EditBookmark = async (id, color, name, role, token) => {
  const formData = new FormData();
  formData.append("id", id);
  formData.append("name", name);
  formData.append("color", color);
  formData.append("role", role);

  try {
    const response = await AppService({
      url: `${URL}${endpoints.EDIT_BOOKMARK}`,
      method: "PUT",
      form: formData,
      token,
    });

    return response?.data;
  } catch (error) {
    console.log(error);
  }
};

export const getBookmarksData = async (token, role, groupBy) => {
  try {
    const response = await AppService({
      url: `${URL}${endpoints.GET_BOOKMARKS_DATA}?role=${role}&group_by=${groupBy}`,
      method: "get",
      token,
    });
    return response?.data?.data;
  } catch (error) {
    return error?.response?.data;
  }
};
