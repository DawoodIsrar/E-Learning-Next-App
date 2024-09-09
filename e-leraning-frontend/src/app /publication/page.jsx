import Publication from "@/components/Publication";
import { getKindlePublicationAndBooks } from "@/services/publication";
import ErrorPage from "@/components/404";
import { generateMetaTags } from "@/utils/metaTags";

export async function generateMetadata() {
  const kindlePublication = await getKindlePublicationAndBooks();
  return generateMetaTags(
    kindlePublication?.meta_title,
    kindlePublication?.meta_description,
    "",
    kindlePublication?.meta_description,
    "publication",
    null
  );
}

const PublicationsPage = async () => {
  const books = await getKindlePublicationAndBooks("books");
  return books?.length ? (
    <Publication books={books} />
  ) : (
    <ErrorPage
      title="No Content"
      subTitle="Sorry, there's no data available to display."
    />
  );
};

export default PublicationsPage;
