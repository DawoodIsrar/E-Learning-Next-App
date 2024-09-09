import { allTermsPages } from "@/services/termspages";
import Policies from "@/components/Policies";
import ErrorPage from "@/components/404";
import { generateMetaTags } from "@/utils/metaTags";

export async function generateMetadata({ params }) {
  const { page_slug } = params;
  const data = await allTermsPages("filter", page_slug);

  return generateMetaTags(
    data?.meta_title,
    data?.meta_description,
    "HTML,CSS,Git,GitHub,Linux,Django,Figma,Web application,Coding Tutorial",
    data?.meta_description,
    page_slug,
    "https://s3.eu-west-1.amazonaws.com/static.d-libro.com/02-course-category-icon-cover/landing-page-og-image.png"
  );
}

const TermsPages = async ({ params }) => {
  const { page_slug } = params;
  const { data, sortedPages } = await allTermsPages("", page_slug);
  return data ? (
    <Policies
      selectedData={data}
      sortedPages={sortedPages}
      page_slug={page_slug}
    />
  ) : (
    <ErrorPage />
  );
};

export default TermsPages;
