import { headers } from "next/headers";
import LayoutWrapper from ".";
import {
  getCourseSchema,
  getTopicSchema,
  getBlogCategorySchema,
  getBlogSchema,
  getPublicationSchema,
  getListPageDesignSchema,
} from "@/services";
import Footer from "@/components/Layout/Footer";
import Header from "@/components/Layout/Header";
import { memberCourses } from "@/services/footer";
import { getUserCookies } from "@/services/server-action-cookies";
import { allTermsPagesSlug } from "@/services/termspages";

const StructuredData = async ({ children }) => {
  let schema;
  const coursesAvailible = await memberCourses();
  const user = await getUserCookies();
  const pathname = headers().get("x-next-pathname");
  const modalState = headers().get("open-modal");
  const termspages = await allTermsPagesSlug(pathname);

  if (termspages) {
    schema = termspages && JSON.parse(termspages);
  }

  if (pathname?.includes("course")) {
    const data = await getCourseSchema(pathname.split("/")[2]);
    schema = data && JSON.parse(data);
  }
  if (pathname?.includes("topic")) {
    const data = await getTopicSchema(pathname.split("/")[2]);
    schema = data && JSON?.parse(data);
  }
  if (pathname?.includes("blog-category")) {
    const data = await getBlogCategorySchema(pathname.split("/")[2]);
    schema = data && JSON.parse(data);
  }
  if (pathname?.includes("blog/")) {
    const data = await getBlogSchema(pathname.split("/")[2]);
    schema = data && JSON.parse(data);
  }
  if (pathname === "/blogs/") {
    const data = await getListPageDesignSchema();
    schema = data && JSON.parse(data);
  }
  if (pathname === "/publication/") {
    const data = await getPublicationSchema();
    schema = data && JSON.parse(data);
  }
  return (
    <LayoutWrapper schema={schema} modalState={modalState}>
      <Header coursesAvailible={coursesAvailible} user={user} />
      {children}
      <Footer coursesAvailible={coursesAvailible} />
    </LayoutWrapper>
  );
};

export default StructuredData;
