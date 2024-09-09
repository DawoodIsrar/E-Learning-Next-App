import Link from "next/link";
import ClockRewind from "@/assets/icons/ClockRewind";
import "./style.scss";

const History = ({ MobileView, authenticated }) => {
  return authenticated ? (
    <Link
      href={"/my-recently-viewed"}
      passHref
      className={`${!MobileView ? "icon" : "no-border"}`}
    >
      <ClockRewind width="24" height="24" />
    </Link>
  ) : (
    <button
      className={`${!MobileView ? "icon" : "no-border"} ${
        !authenticated ? "disable" : ""
      }`}
      onClick={(e) => e.preventDefault()}
      aria-label={"disabled history button"}
    >
      <ClockRewind width="24" height="24" />
    </button>
  );
};

export default History;
