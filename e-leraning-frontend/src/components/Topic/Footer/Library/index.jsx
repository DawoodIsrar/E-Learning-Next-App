import Link from "next/link";
import BookIcon from "@/assets/icons/BookIconForTopic";
import "./style.scss";

const Index = ({ MobileView, authenticated }) => {
  return authenticated ? (
    <Link
      href={"/my-library"}
      passHref
      className={`${!MobileView ? "icon" : "no-border"} ${
        !authenticated ? "disable" : ""
      }`}
    >
      <BookIcon width="24" height="24" />
    </Link>
  ) : (
    <button
      className={`${!MobileView ? "icon" : "no-border"} ${
        !authenticated ? "disable" : ""
      }`}
      aria-label={"disabled library button"}
    >
      <BookIcon width="24" height="24" />
    </button>
  );
};

export default Index;
