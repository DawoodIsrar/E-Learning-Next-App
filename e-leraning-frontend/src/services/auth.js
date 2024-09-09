import { URL, endpoints } from "@/utils/endpoints";
import AppService from "@/utils/api_helper";
import { signIn } from "next-auth/react";

export const signUp = async (username, email, password) => {
  const bodyFormData = new FormData();
  bodyFormData.append("email", email);
  bodyFormData.append("password", password);
  bodyFormData.append("username", username);

  try {
    const response = await AppService({
      url: URL + endpoints.SIGNUP,
      method: "POST",
      form: bodyFormData,
    });

    return response;
  } catch (error) {
    console.log("error", error);
  }
};

export const logIn = async (email, password, userSettingState) => {
  const bodyFormData = new FormData();
  bodyFormData.append("username", email);
  bodyFormData.append("password", password);
  try {
    const response = await AppService({
      url: URL + endpoints.LOGIN,
      method: "POST",
      form: bodyFormData,
    });
    if (response.result === "ok") {
      return response;
    } else {
      return response;
    }
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const verifyUserEmail = async (email, token) => {
  const data = {
    email,
    token,
  };
  try {
    const response = await AppService({
      url: URL + endpoints.VERIFY_LOGIN,
      method: "POST",
      params: data,
      token,
    });
    if (response.result === "ok") {
      return response;
    } else {
      return response;
    }
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const socialLogin = async (
  token,
  updateUser,
  redirectUser,
  setRedirecting
) => {
  try {
    const response = await AppService({
      url: `${URL}${endpoints.SOCIAL_LOGIN}`,
      method: "POST",
      params: {
        token,
      },
    });

    if (response?.result === "ok") {
      const { user, access_token, refresh_token } = response?.data?.data;
      const { icon_url, id, role, social_login, username } = user;

      updateUser(user, access_token);
      setRedirecting(true);
      await signIn("credentials", {
        redirect: false,
        callbackUrl: redirectUser,
        access_token,
        refresh_token,
        email: user?.email,
        icon_url,
        id,
        role,
        social_login,
        username,
      });
    }

    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const changePassword = async (oldpassword, password, role, token) => {
  const formData = new FormData();
  formData.append("old_password", oldpassword);
  formData.append("password", password);
  formData.append("role", role);
  try {
    const response = await AppService({
      url: URL + endpoints.CHANGE_PASSWORD,
      method: "POST",
      form: formData,
      token,
    });

    return response.data;
  } catch (error) {}
};

export const sendVerificationCode = async (email, token) => {
  const formData = new FormData();
  formData.append("email", email);
  try {
    const response = await AppService({
      url: URL + endpoints.SEND_VERIFICATION_CODE,
      method: "POST",
      form: formData,
      token,
    });

    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const forgetPassword = async (email, Code, token) => {
  const formData = new FormData();
  formData.append("email", email);
  formData.append("code", Code);
  try {
    const response = await AppService({
      url: URL + endpoints.FORGOT_PASSWORD,
      method: "POST",
      form: formData,
      token,
    });

    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const resetPassword = async (email, passowrd, code, token) => {
  const formData = new FormData();
  formData.append("email", email);
  formData.append("password", passowrd);
  formData.append("code", code);
  try {
    const response = await AppService({
      url: URL + endpoints.RESET_PASSWORD,
      method: "POST",
      form: formData,
      token,
    });

    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const logout = async () => {};

export const themeSwitch = async (themestate) => {
  try {
  } catch (error) {}
};

export const creamyTheme = async (themestate) => {
  try {
  } catch (error) {}
};
