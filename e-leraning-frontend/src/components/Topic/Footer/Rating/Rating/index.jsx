import ModalCrossIcon from "@/assets/icons/ModalCrossIcon";
import "./style.scss";
import FeedBackAndInquiry from "./RatingForm";

const FeedBack = ({ ratingModalOpen, setRatingModalOpen }) => {
  return (
    ratingModalOpen && (
      <div id="myModal" className="rating-modal">
        <div className="rating-nav-menu">
          <div className="rating-menu-dropdown-wrapper">
            <div className="rating-menu-cross-icon">
              <button
                onClick={() => {
                  setRatingModalOpen(false);
                }}
              >
                <ModalCrossIcon width="16" height="16" />
              </button>
            </div>
            <div className="rating-main-wrapper">
              <FeedBackAndInquiry setRatingModalOpen={setRatingModalOpen} />
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default FeedBack;
