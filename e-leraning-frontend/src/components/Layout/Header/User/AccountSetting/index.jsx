import ModalCrossIcon from "@/assets/icons/ModalCrossIcon";
import AccountSettingForm from "./AccountSettingForm";
import "./style.scss";
import { useEffect } from "react";

const AccountSetting = ({ showSetting, setShowSetting }) => {
  useEffect(() => {
    if (showSetting) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "auto";
    }
  }, [showSetting]);

  return (
    showSetting && (
      <div id="myModal" className="account-modal">
        <div className="account-nav-wrapper">
          <div className="account-nav-menu">
            <div className="account-menu-dropdown-wrapper" id="account-wrapper">
              <div className="account-menu-cross-icon">
                <button
                  onClick={() => {
                    setShowSetting(false);
                  }}
                >
                  <ModalCrossIcon width="16" height="16" />
                </button>
              </div>
              <div className="account-setting-main-wrapper">
                <AccountSettingForm setShowSetting={setShowSetting} />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default AccountSetting;
