import { URL, endpoints } from "@/utils/endpoints";
import AppService from "@/utils/api_helper";

export const profileData = async (role, token) => {
  try {
    const response = await AppService({
      url: URL + endpoints.USER_PROFILE + "?role=" + role,
      method: "get",
      token,
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const updatePassword = async (data, token) => {
  try {
    const response = await AppService({
      url: URL + endpoints.USER_UPDATE_PASSWORD,
      method: "POST",
      params: data,
      token,
    });

    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const forgetPassword = async (data, token) => {
  try {
    const response = await AppService({
      url: URL + endpoints.SEND_VERIFICATION_CODE,
      method: "POST",
      params: data,
      token,
    });

    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const updateProfileIcon = async (formData, token) => {
  try {
    const response = await AppService({
      url: URL + endpoints.UPDATE_USER_ICON,
      method: "POST",
      form: formData,
      token,
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const updateUsername = async (data, token) => {
  try {
    const response = await AppService({
      url: URL + endpoints.UPDATE_USERNAME,
      method: "POST",
      params: data,
      token,
    });

    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const updateEmail = async (data, token) => {
  try {
    const response = await AppService({
      url: URL + endpoints.UPDATE_EMAIL,
      method: "POST",
      params: data,
      token,
    });

    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const deleteUserAccount = async (data, token) => {
  try {
    const response = await AppService({
      url: URL + endpoints.DELETE_ACCOUNT,
      method: "delete",
      params: data,
      token,
    });

    return response.data;
  } catch (error) {
    console.log(error);
  }
};
