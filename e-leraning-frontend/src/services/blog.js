import { URL, endpoints } from "@/utils/endpoints";
import AppService from "../utils/api_helper";

export const getFeatureLandingPageCoursesAndTopics = async (meta) => {
  try {
    const response = await AppService({
      url: `${URL}${endpoints.GET_LIST_PAGE_DESIGN}`,
      method: "get",
    });
    const {
      layout_name,
      active,
      h1_title,
      featured_course,
      featured_posts,
      course_carousels,
      topic_carousels,
      blog_categories,
      meta_title,
      meta_description,
    } = response?.data[0];

    // Base response
    const result = {
      layout_name,
      active,
      h1_title,
      featured_course,
      featured_posts,
      course_carousels,
      topic_carousels,
      blog_categories,
    };

    // If meta is true, add meta_title and meta_description
    if (meta) {
      result.meta_title = meta_title;
      result.meta_description = meta_description;
    }

    return result;
  } catch (error) {
    console.error("Error fetching blog data:", error);
  }
};

export const getBlogDetailBySlug = async (slug) => {
  try {
    const response = await AppService({
      url: `${URL}${endpoints.GET_BLOG_DETAIL}/${slug}`,
      method: "get",
    });
    return response?.data;
  } catch (error) {
    console.error("Error fetching blog data:", error);
  }
};

export const getBlogCategoryBySlug = async (slug, category) => {
  try {
    const response = await AppService({
      url: `${URL}${endpoints.GET_BLOG_BY_CATEGORY}/${slug}`,
      method: "get",
    });
    if (category) {
      return response?.data[0].category;
    }
    return response?.data[0];
  } catch (error) {
    console.error("Error fetching blog data:", error);
  }
};

export const getBlogCategorySchemaBySlug = async (slug) => {
  try {
    const response = await AppService({
      url:
        URL +
        endpoints.GET_BLOG_CATEGORY_SCHEMA_BY_SLUG +
        `?blog_category_slug=${slug}`,
      method: "get",
    });
    return response?.data;
  } catch (error) {
    console.log(error.message);
  }
};

export const getBlogSchemaBySlug = async (slug) => {
  try {
    const response = await AppService({
      url: URL + endpoints.GET_BLOG_SCHEMA_BY_SLUG + `?blog_slug=${slug}`,
      method: "get",
    });
    return response?.data;
  } catch (error) {
    console.log(error.message);
  }
};
export const getAllListPageDesignSchema = async (slug) => {
  try {
    const response = await AppService({
      url: URL + endpoints.GET_LIST_PAGE_VIEW_SCHEMA,
      method: "get",
    });
    return response?.data[0];
  } catch (error) {
    console.log(error.message);
  }
};

export const getFeaturedBlogs = async (slug) => {
  try {
    const response = await AppService({
      url: URL + endpoints.GET_FEATURED_BLOGS,
      method: "get",
    });
    return response?.data;
  } catch (error) {
    console.log(error.message);
  }
};
