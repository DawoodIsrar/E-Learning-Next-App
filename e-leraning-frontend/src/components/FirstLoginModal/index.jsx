import ModalCrossIcon from "@/assets/icons/ModalCrossIcon";
import FirstLogin from "../common/FirstLogin";

const FirstLoginModal = ({ setShowModal }) => {
  const hideModal = () => {
    setShowModal(false);
  };
  return (
    <div id="myModal" className="account-modal">
      <div className="account-nav-wrapper">
        <div className="account-nav-menu">
          <div className="account-menu-dropdown-wrapper" id="account-wrapper">
            <div className="account-menu-cross-icon">
              <button onClick={hideModal}>
                <ModalCrossIcon width="16" height="16" />
              </button>
            </div>
            <div className="account-setting-main-wrapper">
              <FirstLogin hideModal={hideModal} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FirstLoginModal;
