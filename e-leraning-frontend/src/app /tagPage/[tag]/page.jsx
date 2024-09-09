import SearchResultTopic from "@/components/SearchResultTopic";
import ErrorPage from "@/components/ErrorPage";
import { searchTag } from "@/services/search";
import { generateMetaTags } from "@/utils/metaTags";

export async function generateMetadata({ params }) {
  const { tag } = params;
  const decodedSlug = decodeURIComponent(tag);

  const cleanSlug = decodedSlug
    .split("-") // Split the string by '-'
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize the first letter of each word
    .join(" "); // Join the words with a space

  const metaDescription = `This is the tag page for ${cleanSlug} provided by D-Libro | Digital Book Library for Web Skill Training`;

  return generateMetaTags(
    cleanSlug,
    metaDescription,
    "",
    metaDescription,
    `tagPage/${decodedSlug}`,
    null
  );
}

const TagPage = async ({ params }) => {
  const { tag } = params;
  let response = await searchTag(tag.replace(/[_\s]+/g, "-"));
  const decodedSlug = decodeURIComponent(tag);

  return response?.data?.length ? (
    <SearchResultTopic data={response?.data} query={decodedSlug} tag={true} />
  ) : (
    <ErrorPage
      title="No Content"
      subTitle="Sorry, there's no data available to display."
    />
  );
};

export default TagPage;
