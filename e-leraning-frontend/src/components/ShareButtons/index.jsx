import { useRouter } from "next/navigation";
import LibraryIcon from "@/assets/images/LibraryIcon.svg";
import HistoryIcon from "@/assets/images/HistoryIcon.svg";
import RatingIcon from "@/assets/icons/Star";
import ShareIcon from "@/assets/images/ShareIcon.svg";
import Image from "next/image";

const ShareButton = ({
  token,
  onRatingClick,
  historyClass,
  libraryClass,
  ratingClass,
  handleShowShareMenu,
}) => {
  const router = useRouter();
  const hanldeRatingNavigate = () => {
    if (token && onRatingClick) {
      onRatingClick();
    }
  };

  const handleRecentlyViewed = () => {
    if (token) router.push("/recently-viewed");
  };

  const handleLibraryCourses = () => {
    if (token) router.push("/my-library-courses");
  };
  return (
    <>
      <div className={historyClass} onClick={handleRecentlyViewed}>
        <div>
          <Image
            src={HistoryIcon}
            alt="check recently viewed topics (history)"
            className="userBasicActShorWrapperImage"
            width={26}
            height={23}
          />
          <div className="userBasicActShorWrapperText">history</div>
        </div>
      </div>
      <div className={libraryClass} onClick={handleLibraryCourses}>
        <div>
          <Image
            src={LibraryIcon}
            alt="check bookmarked topics"
            className="userBasicActShorWrapperImage"
            width={25}
            height={22}
          />
          <div className="userBasicActShorWrapperText">Library</div>
        </div>
      </div>
      <div className={ratingClass} onClick={hanldeRatingNavigate}>
        <div>
          <Image
            src={RatingIcon}
            alt="give rating and feedback"
            className="userBasicActShorWrapperImage"
            width={26}
            height={25}
          />
          <div className="userBasicActShorWrapperText">rating</div>
        </div>
      </div>
      <div
        className="userBasicActShorWrapper userBasicActShorWrapperActive"
        onClick={handleShowShareMenu}
      >
        <div>
          <Image
            src={ShareIcon}
            alt="share a URL via email or chat app"
            className="userBasicActShorWrapperImage"
            width={24}
            height={25}
          />
          <div className="userBasicActShorWrapperText">Share</div>
        </div>
      </div>
    </>
  );
};

export default ShareButton;
