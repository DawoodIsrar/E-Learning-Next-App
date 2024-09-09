import { URL, endpoints } from "@/utils/endpoints";
import AppService from "@/utils/api_helper";

export const getKindlePublicationAndBooks = async (objToReturn) => {
  try {
    const response = await AppService({
      url: URL + endpoints.GET_ALL_BOOKS_AND_KINDLE_PUBLICATION,
      method: "get",
    });
    return objToReturn === "books"
      ? response?.data?.books
      : response?.data?.kindle_publications[0];
  } catch (error) {
    console.log(error);
  }
};

export const getAllPublicationSchema = async () => {
  try {
    const response = await AppService({
      url: URL + endpoints.GET_PUBLICATION_SCHEMA,
      method: "get",
    });
    return response?.data[0];
  } catch (error) {
    console.log(error.message);
  }
};
