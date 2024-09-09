import AppService from "@/utils/api_helper";
import { endpoints, URL } from "@/utils/endpoints";

export const allTermsPages = async (filter, page_slug) => {
  try {
    const response = await AppService({
      url: URL + endpoints.GET_ALL_PAGES,
      method: "get",
    });

    const selectedData = response?.data?.filter(
      (item) => item?.slug === page_slug
    );
    const data = selectedData.length && selectedData[0];

    const comparePositions = (a, b) => a.position - b.position;
    const sortedPages = response?.data?.sort(comparePositions);
    if (filter) {
      return data;
    }

    return { data, sortedPages };
  } catch (error) {
    console.log(error);
  }
};

export const allTermsPagesSlug = async (pathname) => {
  try {
    const response = await AppService({
      url: URL + endpoints.GET_PAGES_SLUG,
      method: "get",
    });
    if (pathname) {
      const cleanedStr = pathname.replace(/^\/|\/$/g, "");
      const result = response?.data.includes(cleanedStr);
      if (result) {
        const response = await AppService({
          url: URL + endpoints.GET_PAGES_SCHEMA_BY_SLUG + `/${cleanedStr}`,
          method: "get",
        });
        return response.data;
      }
    }
    // return response?.data;
  } catch (error) {
    console.log(error);
  }
};
