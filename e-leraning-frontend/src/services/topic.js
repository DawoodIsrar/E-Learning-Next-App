import CrossRedIcon from "@/assets/images/CrossRed.svg";
import MemberOnlyIcon from "@/assets/images/Medal.svg";
import EditorPenIcon from "@/assets/images/EditorPenIcon.svg";
import WIPIcon from "@/assets/images/WIPIcon.svg";
import EarthIcon from "@/assets/images/EarthIcon.svg";
import CheckGreenIcon from "@/assets/images/CheckGreen.svg";
import { getTopicData } from "@/services";
import AppService from "../utils/api_helper";
import { getAccessTokenCookies, getUserCookies } from "./server-action-cookies";
import { redirect } from "next/navigation";
import { URL, endpoints } from "@/utils/endpoints";

export const findTopicStatusIcon = (data) => {
  switch (data?.visibility_status) {
    case "member_only":
      return MemberOnlyIcon;
    case "editor_only":
      return EditorPenIcon;
    default:
      return EarthIcon;
  }
};

export const findEnglishEditStatus = (data) => {
  switch (data?.english_edit_status) {
    case "not_started":
      return {
        label: "No Eng",
        icon: CrossRedIcon,
      };
    case "wip":
      return {
        label: "Eng WIP",
        icon: WIPIcon,
      };
    default:
      return {
        label: "Eng edit",
        icon: CheckGreenIcon,
      };
  }
};
export const getTopicDataBySlug = async (slug) => {
  let accessToken;
  let user;
  let role;

  try {
    accessToken = await getAccessTokenCookies();
    user = await getUserCookies();
    role = user && JSON.parse(user)?.role;
  } catch (error) {
    console.error("Error getting cookies:", error);
    return null;
  }

  let topicData;

  try {
    topicData = await getTopicData(slug);
  } catch (error) {
    return null;
  }
  if (!topicData?.details?.id) {
    redirect("/404");
  }
  return topicData;
};

export const getTopicSchemaBySlug = async (slug) => {
  try {
    const response = await AppService({
      url: URL + endpoints.GET_TOPIC_SCHEMA_BY_SLUG + `?topic_slug=${slug}`,
      method: "get",
    });
    return response?.data;
  } catch (error) {
    console.log(error.message);
  }
};
