export const URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const endpoints = {
  //Home
  GET_MAIN_CATEGORY: "/api/index",

  //Auth
  SIGNUP: "/api/signup",
  LOGIN: "/api/login",
  VERIFY_LOGIN: "/api/verify",
  CHANGE_PASSWORD: "/api/update-password",
  SEND_VERIFICATION_CODE: "/api/forget-password",
  FORGOT_PASSWORD: "/api/verify-code",
  RESET_PASSWORD: "/api/reset-password",
  UPDATE_USER_ICON: "/api/update-icon",
  UPDATE_USERNAME: "/api/update-username",
  UPDATE_EMAIL: "/api/update-email",
  DELETE_ACCOUNT: "/api/delete-account",

  // Google Auth
  SOCIAL_LOGIN: "/api/social-login",

  //Profile
  USER_PROFILE: "/api/me",
  USER_UPDATE_PASSWORD: "/api/update-password",
  ADD_BROWSE_RECORD: "/api/me/browse-record",
  //Dashboard Data
  DASHBOARD_DATA_WITH_AUTHORIZATION: "/api/course?role=",
  DASHBOARD_DATA_WITH_AUTHORIZATION_BY_COURSE_SLUG: "/api/course-by-slug?role=",
  GET_RECENTLY_VIEWED_COURSES: "/api/me/browse-courses",
  GET_BOOKMARKED_COURSES: "/api/me/bookmark-courses",
  GET_RECENTLY_VIEWED_COURSE_TOPICS: "/api/me/browse-topics",
  GET_BOOKMARKED_COURSE_TOPICS: "/api/me/bookmark-topics",

  //Category
  PARENT_CATEGORY: "/GetParentCategories",

  //Post
  GET_POST_BY_ID: "/api/topic?",

  //Category

  SEARCH_CONTENT: "/api/topic-search",
  SEARCH_BY_COURSE: "/api/course-search?q=",
  SEARCH_BY_TAG: "/api/tag",

  // Feedback
  ADD_FEEDBACK: "/api/feedback",
  COURSE_FEEDBACK: "/api/course-rating",
  TOPIC_FEEDBACK: "/api/topic-rating",
  GET_USER_TOPIC_FEEDBACK: "/api/topic-rating",
  GET_USER_COURSE_FEEDBACK: "/api/course-rating",

  // BOOKMARK
  ADD_BOOKMARK_LIBRARY: "/api/bookmark-list",
  GET_ALL_BOOKMARK: "/api/bookmark-list",
  ADD_CONTENT_BOOKMARK: "/api/bookmark-list",
  DELETE_BOOKMARK: "/api/bookmark-list",
  EDIT_BOOKMARK: "/api/bookmark-list",
  UPDATE_BOOKMARK_TOPIC: "/api/bookmark",
  GET_BOOKMARKS_DATA: "/api/me/bookmarks",

  // HISTORY
  GET_HISTORY_COURSE: "/api/me/browse-records",

  //EDITOR'S NEW API'S
  GET_EDITOR_COURSES: "/api/editor/courses",
  GET_EDITOR_COURSE_CHAPTER_LIST: "/api/editor/course-chapters?id=",
  GET_EDITOR_COURSE_DETAILS: "/api/editor/course?id=",
  GET_EDITOR_COURSE_TOPICS_LIST: "/api/editor/course-topics?id=",
  GET_EDITOR_CHAPTER_DETAIL: "/api/editor/chapter?id=",
  UPDATE_EDITOR_CHAPTER_DETAIL: "/api/editor/chapter",
  GET_EDITOR_TOPIC_DETAIL: "/api/editor/topic?id=",
  UPDATE_EDITOR_TOPIC_DETAIL: "/api/editor/topic",
  GET_EDITOR_COURSE_FEEDBACK: "/api/editor/course-ratings?id=",
  GET_EDITOR_COURSE_TOPICS_FEEDBACK: "/api/editor/course-topic-ratings?id=",
  TOPIC_MASS_ACTION: "/api/editor/topic-mass-action",
  COURSE_MASS_ACTION: "/api/editor/course-mass-action",
  CHAPTER_MASS_ACTION: "/api/editor/chapter-mass-action",
  UPDATE_COURSE_ICON: "/api/editor/course-icon",
  UPDATE_COURSE_COVER: "/api/editor/course-cover-image",
  GET_EDITOR_TOPIC_FEEDBACK: "/api/editor/topic-ratings?id=",
  GET_EDITOR_CHAPTER_FEEDBACK: "/api/editor/course-chapter-ratings?id=",

  // COURSES
  GET_ALL_COURSES: "/api/get-all-courses",
  GET_ALL_COURSES_EXTENDED: "/api/get-all-courses-extended",
  GET_ALL_PUBLIC_COURSES: "/api/public-courses",
  GET_ALL_OPEN_EDITOR_COURSES: "/api/open-editor-courses",
  GET_COURSE_DETAILS_BY_SLUG: "/api/course-by-slug?course_slug=",
  GET_ALL_MEMBER_COURSES: "/api/public-and-member-courses",
  GET_COURSE_SCHEMA_BY_SLUG: "/api/get-course-schema",
  //topic
  GET_TOPIC_SCHEMA_BY_SLUG: "/api/get-topic-schema",

  GET_COURSE_BY_ID: "/api/editor",
  UPDATE_AND_ADD_COURSE: "/api/editor",

  //footer pages
  GET_ALL_FOOTER_PAGES: "/api/footer-pages",

  //Publication
  GET_ALL_BOOKS_AND_KINDLE_PUBLICATION:
    "/api/publication/get-kindle-publication-and-books",
  GET_PUBLICATION_SCHEMA: "/api/publication/get-kindle-publication-schema",

  //blogs
  GET_BLOG_CATEGORY_SCHEMA_BY_SLUG: "/api/blog/get-blog-category-schema",
  GET_BLOG_SCHEMA_BY_SLUG: "/api/blog/get-blog-schema",
  GET_LIST_PAGE_VIEW_SCHEMA: "/api/blog/get-list-page-design-schema",
  GET_BLOG_BY_CATEGORY: "/api/blog/get-blog-by-category",
  GET_BLOG_DETAIL: "/api/blog",
  GET_LIST_PAGE_DESIGN: "/api/blog/get-list-page-design",
  GET_FEATURED_BLOGS: "/api/blog/get-featured-blogs",

  //terms pages
  GET_ALL_PAGES: "/api/pages",
  GET_PAGES_SLUG: "/api/get-pages-slug",
  GET_PAGES_SCHEMA_BY_SLUG: "/api/get-pages-schema",
};
