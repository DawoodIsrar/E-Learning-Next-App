import ModalCrossIcon from "@/assets/icons/ModalCrossIcon";
import FeedBackAndInquiry from "./FeedBackAndInquiry";
import "./style.scss";

const FeedBack = ({ showFeedBackModal, setShowFeedBackModal }) => {
  return (
    showFeedBackModal && (
      <div id="myModal" className="feedBack-modal">
        <div className="feedBack-nav-menu">
          <div className="feedBack-menu-dropdown-wrapper">
            <div className="feedBack-menu-cross-icon">
              <button
                onClick={() => {
                  setShowFeedBackModal(false);
                }}
              >
                <ModalCrossIcon width="16" height="16" />
              </button>
            </div>
            <div className="feedBack-main-wrapper">
              <FeedBackAndInquiry setShowFeedBackModal={setShowFeedBackModal} />
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default FeedBack;
