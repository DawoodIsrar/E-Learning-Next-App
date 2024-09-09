import ModalCrossIcon from "@/assets/icons/ModalCrossIcon";
import FeedBackAndInquiry from "./RatingForm";
import "./style.scss";

const FeedBack = ({ ratingModalOpen, setRatingModalOpen, data }) => {
  return (
    ratingModalOpen && (
      <div id="myModal" className="account-modal">
        <div className="rating-modal-course-wrapper">
          <div className="account-nav-menu">
            <div className="account-menu-dropdown-wrapper-rating">
              <div className="account-menu-cross-icon">
                <button
                  onClick={() => {
                    setRatingModalOpen(false);
                  }}
                >
                  <ModalCrossIcon width="16" height="16" />
                </button>
              </div>
              <div className="account-setting-main-wrapper">
                <FeedBackAndInquiry
                  courseData={data}
                  setRatingModalOpen={setRatingModalOpen}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default FeedBack;
