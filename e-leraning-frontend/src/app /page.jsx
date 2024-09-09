import Home from "@/components/Home";
import {
  getCookiesByKey,
  getAccessTokenCookies,
} from "@/services/server-action-cookies";
import { allPublicCourses, allOpenEditorCourses } from "@/services/home";
import {
  getBookmarkedCourses,
  getRecentlyViewCourses,
} from "@/services/course";
import { homeMetaData } from "@/utils/metaTags";

export const metadata = homeMetaData;

const HomePage = async () => {
  const accessToken = await getAccessTokenCookies();
  let user = await getCookiesByKey("user");
  user = user && JSON.parse(user);

  const courses = accessToken
    ? await allOpenEditorCourses(accessToken)
    : await allPublicCourses();
  const bookmarkCourses = user
    ? await getBookmarkedCourses(user?.role, accessToken)
    : [];
  const recentlyViewedCourses = user
    ? await getRecentlyViewCourses(user?.role, accessToken)
    : [];
  console.log("courses", courses);
  console.log("user.id", user?.id);
  console.log("bookmarkCourses", bookmarkCourses);
  console.log("recentlyVIewedCourses", recentlyViewedCourses);
  return (
    <Home
      userId={user?.id}
      courses={courses}
      bookmarkCourses={bookmarkCourses}
      recentlyViewedCourses={recentlyViewedCourses}
    />
  );
};

export default HomePage;
