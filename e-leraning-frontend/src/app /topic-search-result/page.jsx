import SearchResultTopic from "@/components/SearchResultTopic";
import { searchAction } from "@/services/search";
import {
  getAccessTokenCookies,
  getUserCookies,
} from "@/services/server-action-cookies";

export const metadata = {
  title:
    "Topic search result - D-Libro | Digital Book Library for Web Skill Training",
};

const Page = async ({ searchParams }) => {
  const accessToken = await getAccessTokenCookies();
  const user = await getUserCookies();

  const query = searchParams.query;

  if (!query) return;

  let response = await searchAction(query, "", accessToken, user?.role);

  return <SearchResultTopic data={response?.data} query={query} />;
};

export default Page;
