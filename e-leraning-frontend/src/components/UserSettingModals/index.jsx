import { toast } from "react-toastify";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import BookmarkIcon from "@/assets/images/BookmarkBook.svg";
import AccountIcon from "@/assets/images/AccountIcon.svg";
import CrossIcon from "@/assets/images/CrossRed.svg";
import { UserSettingsModalsTypes } from "@/utils";
import { usePathname, useRouter } from "next/navigation";
import Modal from "../Modal";
import {
  deleteUserAccount,
  updateEmail,
  updatePassword,
  updateUsername,
} from "@/services/profile";
import { sendVerificationCode } from "@/services/auth";
import { useEffect, useState } from "react";
import "./style.scss";
import Image from "next/image";
import { signOut } from "next-auth/react";

const ChangeUsername = ({ setIsOpen, token, role, userData }) => {
  const [tempUsername, setTempUsername] = useState("");
  const [error, setError] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    const response = await updateUsername(
      { role, username: tempUsername },
      token
    );
    if (response?.result === "error") {
      setError(response?.error?.message);
      setTimeout(() => {
        setError("");
      }, 3000);
    } else {
      await userData();
      setIsOpen(false);
    }
  };

  return (
    <form className={`userSettingsModal`} onSubmit={onSubmit}>
      <h4>Change username</h4>
      <input
        type="text"
        placeholder="Username"
        value={tempUsername}
        onChange={(e) => setTempUsername(e.target.value)}
        required
      />
      <div
        className="errorMessage"
        style={{ border: "none", padding: 0, minHeight: "20px" }}
      >
        {error || ""}
      </div>
      <div className="userSettingsModal_btnRightAlign">
        <button className="userSettingsModal_submitBtn" type="submit">
          Save
        </button>
      </div>
    </form>
  );
};

const ChangeEmail = ({ setUserSettingModal, token, role }) => {
  const [tempEmail, setTempEmail] = useState("");
  const [tempPassword, setTempPassword] = useState("");
  const [apiResponse, setApiResponse] = useState();

  const onSubmit = async (e) => {
    e.preventDefault();
    setApiResponse(null);
    const response = await updateEmail(
      { role, password: tempPassword, email: tempEmail },
      token
    );
    if (response?.result === "error") {
      setApiResponse(response?.error);
    } else {
      setApiResponse(response?.data);
    }
    setTimeout(() => {
      setApiResponse(null);
    }, 3000);
  };

  return (
    <form className={`userSettingsModal`} onSubmit={onSubmit}>
      <h4>Change email</h4>
      <p>We'll send a verification email to your new email address </p>

      <div className="userSettingsModal_inputsContainer">
        <input
          type="email"
          placeholder="New Email"
          autoComplete="off"
          value={tempEmail}
          onChange={(e) => setTempEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Current password"
          autoComplete="off"
          value={tempPassword}
          onChange={(e) => setTempPassword(e.target.value)}
          required
        />
      </div>

      <div
        className={apiResponse?.status ? "successMessage" : "errorMessage"}
        style={{ border: "none", padding: 0, minHeight: "20px" }}
      >
        {Object.keys(apiResponse || {})?.length > 0
          ? apiResponse?.message || ""
          : ""}
      </div>

      <div className="userSettingsModal_btnBetweenAlign">
        <span
          onClick={() =>
            setUserSettingModal(UserSettingsModalsTypes.forgotPassword)
          }
          className="userSettingsModal_forgetPassword"
        >
          Forgot password?
        </span>
        <button className="userSettingsModal_submitBtn">Save</button>
      </div>
    </form>
  );
};

const ForgotPassword = ({
  email,
  token,
  setUserSettingModal,
  setShowSetting,
}) => {
  const router = useRouter();

  const [tempEmail, setTempEmail] = useState("");
  const [passMatched, setPassMatched] = useState("");

  useEffect(() => {
    setTempEmail(email);
  }, [email]);

  const onForgetPassword = async (e) => {
    e.preventDefault();
    const response = await sendVerificationCode(tempEmail, token);

    if (response?.result === "error") {
      setPassMatched(response?.error?.message);
      setTimeout(() => setPassMatched(""), 3000);
    } else {
      setUserSettingModal("");
      setShowSetting(false);
      router.push(`/forgot-password?email=${tempEmail}`);
    }
  };

  return (
    <form className={`userSettingsModal`} onSubmit={onForgetPassword}>
      <h4>Forgot password</h4>
      <p>We'll send a verification code to your registered email</p>

      <input
        type="email"
        placeholder="Your email "
        value={tempEmail}
        onChange={(e) => setTempEmail(e.target.value)}
      />
      <div
        className="errorMessage"
        style={{ border: "none", padding: 0, minHeight: "20px" }}
      >
        {passMatched || ""}
      </div>
      <div className="userSettingsModal_btnRightAlign">
        <button className="userSettingsModal_submitBtn" type="submit">
          Submit
        </button>
      </div>
    </form>
  );
};

const ChangePassword = ({
  setIsOpen,
  username,
  token,
  role,
  setUserSettingModal,
}) => {
  const [curPass, setCurPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [newConfPass, setNewConfPass] = useState("");
  const [passMatched, setPassMatched] = useState("");
  const [disableButton, setDisableButton] = useState(false);

  const comparePassword = (tempNewPass, tempConfPass) => {
    if (tempNewPass?.length > 0 && tempConfPass?.length > 0) {
      if (tempNewPass === tempConfPass) {
        setPassMatched("");
        if (newPass?.length < 8) {
          setPassMatched(
            "A password must have at least 8 characters in length"
          );
          return;
        }
        if (newPass?.length > 20) {
          setPassMatched("A password must not exceed 20 characters in length");
          return;
        }
      } else {
        setPassMatched("New password and confirm password do not match");
      }
    } else {
      setPassMatched("New password and confirm password do not match");
    }
  };

  const passwordChange = async (e) => {
    setDisableButton(true);
    e.preventDefault();
    if (!passMatched) {
      const response = await updatePassword(
        {
          role,
          old_password: curPass,
          password: newPass,
        },
        token
      );
      if (!response?.data?.status) {
        toast.error(response?.data?.message);
      } else {
        toast.success(response?.data?.message);
      }
      if (response?.result === "error") {
        toast.error(response?.error);
        setPassMatched(response?.error?.message);
        setTimeout(() => setPassMatched(""), 3000);
      } else {
        setIsOpen(false);
      }
      setDisableButton(false);
    }
  };

  return (
    <div className="change-password-wrapper">
      <form className={`userSettingsModal`} onSubmit={passwordChange}>
        <h4>Change password</h4>

        <div className="userSettingsModal_inputsContainer">
          <input
            type="text"
            autocomplete="username"
            value={username}
            style={{ visibility: "hidden", height: "0px" }}
          />
          <input
            type="password"
            placeholder="Current password"
            onChange={(e) => setCurPass(e.target.value)}
            value={curPass}
            autocomplete="current-password"
            required
          />
          <input
            type="password"
            placeholder="New password"
            autocomplete="new-password"
            onChange={(e) => {
              setNewPass(e.target.value);
              comparePassword(e.target.value, newConfPass);
            }}
            value={newPass}
            required
          />
          <input
            type="password"
            placeholder="Confirm password"
            onChange={(e) => {
              setNewConfPass(e.target.value);
              comparePassword(newPass, e.target.value);
            }}
            // className="error"
            value={newConfPass}
            autocomplete="new-password"
            required
          />
          <div className="errorMessage">{passMatched || ""}</div>
        </div>
        <div className="userSettingsModal_btnBetweenAlign">
          <span
            onClick={() =>
              setUserSettingModal(UserSettingsModalsTypes.forgotPassword)
            }
            className="userSettingsModal_forgetPassword"
          >
            Forgot password?
          </span>
          <button
            className="userSettingsModal_submitBtn"
            type="submit"
            disabled={disableButton || !!passMatched || !newConfPass}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

const Settings = ({ setUserSettingModal }) => {
  return (
    <>
      <div className={`userSettingsModal`}>
        <h4>
          <SettingsOutlinedIcon />
          Settings
        </h4>

        <div className="userSettingsModal_inputsContainer">
          <button disabled className="userSettingsModal_settingBtn">
            Change subscription plan
          </button>
          <button
            className="userSettingsModal_settingBtn"
            onClick={() =>
              setUserSettingModal(UserSettingsModalsTypes.deleteAccount)
            }
          >
            Delete account
          </button>
        </div>
      </div>
    </>
  );
};

const DeleteAccount = ({
  setUserSettingModal,
  token,
  role,
  handleLogout,
  setIsOpen,
}) => {
  const pathname = usePathname();
  const [disableBtn, setDisableBtn] = useState(false);

  const onDeleteAccount = async () => {
    setDisableBtn(true);
    const response = await deleteUserAccount({ role }, token);
    if (response?.status) {
      await signOut({ callbackUrl: `${pathname}`, redirect: true });
      setIsOpen(false);
    }
  };

  return (
    <div className="permanent-delete-wrapper">
      <div className={`userSettingsModal`}>
        <div className="userSettingsModal_contentContainer">
          <h4>Delete account</h4>
          <div className="userSettingsModal_IconContainer">
            <Image src={AccountIcon} alt="account" />
            <Image src={CrossIcon} alt="cross" />
          </div>
        </div>

        <div className="userSettingsModal_contentContainer">
          <p>Are you sure you want to permanently delete your account?</p>
          <p>
            All data associated with this account (e.g., bookmarks and history)
            will be deleted permanently.
          </p>
        </div>

        <div className="userSettingsModal_btnsCenter">
          <button
            className="userSettingsModal_submitBtn"
            onClick={() =>
              setUserSettingModal(UserSettingsModalsTypes.settings)
            }
          >
            Back
          </button>
          <button
            className="userSettingsModal_delete"
            onClick={onDeleteAccount}
            disabled={disableBtn}
          >
            Permanently Delete
          </button>
        </div>
      </div>
    </div>
  );
};

const DeleteAccountSuccess = () => {
  return (
    <div className={`userSettingsModal`}>
      <div className="userSettingsModal_contentContainer">
        <h4>Delete account</h4>
        <div className="userSettingsModal_IconContainer">
          <Image src={AccountIcon} alt="account2" />
          <Image src={CrossIcon} alt="cross2" />
        </div>
      </div>

      <h6>Your account has been successfully deleted.</h6>

      <button className="userSettingsModal_submitBtn">Back</button>
    </div>
  );
};

const DeleteBookmarks = ({
  deleteBookmarkDetails,
  handleDeleteBookmark,
  disabled,
}) => {
  return (
    <div className="bookmark-delete-wrapper">
      <div className={`userSettingsModal`}>
        <div className="userSettingsModal_contentContainer">
          <h4>Delete bookmarks</h4>
          <div className="userSettingsModal_IconContainer">
            <Image src={BookmarkIcon} alt="account3" />
            <Image src={CrossIcon} alt="cross3" />
          </div>

          <p>
            <svg
              width="20"
              height="24"
              viewBox="0 0 25 30"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill={deleteBookmarkDetails.color}
                d="M1.7866 30C1.47986 29.9991 1.17854 29.9245 0.911674 29.7833C0.635865 29.6386 0.406202 29.4281 0.246194 29.1733C0.0861867 28.9185 0.00158045 28.6287 0.00103521 28.3333V3.88333C-0.0231026 2.88386 0.375696 1.91577 1.111 1.18887C1.84631 0.461973 2.85889 0.0348242 3.92928 0H21.0707C22.1411 0.0348242 23.1537 0.461973 23.889 1.18887C24.6243 1.91577 25.0231 2.88386 24.999 3.88333V28.3333C24.9971 28.6242 24.9137 28.9095 24.7571 29.161C24.6004 29.4124 24.376 29.6212 24.1062 29.7667C23.8347 29.9129 23.5268 29.99 23.2134 29.99C22.9 29.99 22.5921 29.9129 22.3206 29.7667L12.1965 24.4167L2.67938 29.75C2.41075 29.9056 2.10266 29.9919 1.7866 30Z"
              />
            </svg>
            High Priority Review List
          </p>
        </div>

        <div className="userSettingsModal_contentContainer">
          <p>
            Currently, you have{" "}
            <strong> {deleteBookmarkDetails?.bookmarkCount} topics </strong>{" "}
            bookmarked under this bookmark.
          </p>
          <p>Are you sure you want to delete this bookmark?</p>
        </div>

        <button
          className="userSettingsModal_delete"
          onClick={() => handleDeleteBookmark(deleteBookmarkDetails.id)}
          disabled={disabled}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

const DeleteBookmarksSuccess = ({ setIsOpen, deleteBookmarkDetails }) => {
  return (
    <div className={`userSettingsModal`}>
      <div className="userSettingsModal_contentContainer">
        <h4>Delete bookmarks</h4>
        <div className="userSettingsModal_IconContainer">
          <Image src={BookmarkIcon} alt="account4" />
          <Image src={CrossIcon} alt="cross4" />
        </div>

        <p>
          <svg
            width="20"
            height="24"
            viewBox="0 0 25 30"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill={deleteBookmarkDetails.color}
              d="M1.7866 30C1.47986 29.9991 1.17854 29.9245 0.911674 29.7833C0.635865 29.6386 0.406202 29.4281 0.246194 29.1733C0.0861867 28.9185 0.00158045 28.6287 0.00103521 28.3333V3.88333C-0.0231026 2.88386 0.375696 1.91577 1.111 1.18887C1.84631 0.461973 2.85889 0.0348242 3.92928 0H21.0707C22.1411 0.0348242 23.1537 0.461973 23.889 1.18887C24.6243 1.91577 25.0231 2.88386 24.999 3.88333V28.3333C24.9971 28.6242 24.9137 28.9095 24.7571 29.161C24.6004 29.4124 24.376 29.6212 24.1062 29.7667C23.8347 29.9129 23.5268 29.99 23.2134 29.99C22.9 29.99 22.5921 29.9129 22.3206 29.7667L12.1965 24.4167L2.67938 29.75C2.41075 29.9056 2.10266 29.9919 1.7866 30Z"
            />
          </svg>
          High Priority Review List
        </p>
      </div>

      <h6>The bookmark has been successfully deleted.</h6>

      <button
        className="userSettingsModal_submitBtn"
        onClick={() => setIsOpen(false)}
      >
        Back
      </button>
    </div>
  );
};

const EditBookmark = ({
  modalColorCode,
  setModalColorCode,
  bookmarkValue,
  setBookmarkValue,
  handleEditBookmark,
  bookmark,
}) => {
  return (
    <form
      className={`userSettingsModal`}
      onSubmit={() => handleEditBookmark(bookmark)}
    >
      <h4>Edit Bookamrk</h4>
      <div className="userSettingsModal_colorInputContainer">
        <input
          type="color"
          value={modalColorCode}
          className="userSetting_colorPicker"
          onChange={(e) => {
            setModalColorCode(e.target.value);
          }}
          required
        />
        <input
          type="text"
          placeholder="Add Your Custom Bookmark"
          value={bookmarkValue}
          onChange={(e) => setBookmarkValue(e.target.value)}
          required
        />
      </div>

      <div className="userSettingsModal_btnRightAlign">
        <button className="userSettingsModal_submitBtn" type="submit">
          Update
        </button>
      </div>
    </form>
  );
};

const UserSettingModals = ({
  isOpen,
  setIsOpen,
  userSettingModal,
  setUserSettingModal,
  deleteBookmarkDetails,
  handleDeleteBookmark,
  modalColorCode,
  setModalColorCode,
  bookmarkValue,
  setBookmarkValue,
  handleEditBookmark,
  bookmark,
  token,
  role,
  username,
  email,
  userData,
  handleLogout,
  disabled,
  setShowSetting,
}) => {
  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      {userSettingModal === UserSettingsModalsTypes.changeUsername && (
        <ChangeUsername
          setUserSettingModal={setUserSettingModal}
          setIsOpen={setIsOpen}
          token={token}
          role={role}
          username={username}
          userData={userData}
        />
      )}

      {userSettingModal === UserSettingsModalsTypes.changeEmail && (
        <ChangeEmail
          setUserSettingModal={setUserSettingModal}
          setIsOpen={setIsOpen}
          token={token}
          role={role}
        />
      )}

      {userSettingModal === UserSettingsModalsTypes.forgotPassword && (
        <ForgotPassword
          email={email}
          token={token}
          setUserSettingModal={setUserSettingModal}
          setShowSetting={setShowSetting}
        />
      )}

      {userSettingModal === UserSettingsModalsTypes.changePassword && (
        <ChangePassword
          setUserSettingModal={setUserSettingModal}
          setIsOpen={setIsOpen}
          token={token}
          role={role}
          username={username}
        />
      )}

      {userSettingModal === UserSettingsModalsTypes.settings && (
        <Settings setUserSettingModal={setUserSettingModal} />
      )}

      {userSettingModal === UserSettingsModalsTypes.deleteAccount && (
        <DeleteAccount
          setUserSettingModal={setUserSettingModal}
          setIsOpen={setIsOpen}
          token={token}
          role={role}
          handleLogout={handleLogout}
        />
      )}

      {userSettingModal === UserSettingsModalsTypes.deleteAccountSuccess && (
        <DeleteAccountSuccess />
      )}

      {userSettingModal === UserSettingsModalsTypes.deleteBookmarks && (
        <DeleteBookmarks
          deleteBookmarkDetails={deleteBookmarkDetails}
          handleDeleteBookmark={handleDeleteBookmark}
          setUserSettingModal={setUserSettingModal}
          disabled={disabled}
        />
      )}

      {userSettingModal === UserSettingsModalsTypes.deleteBookmarksSuccess && (
        <DeleteBookmarksSuccess
          setIsOpen={setIsOpen}
          deleteBookmarkDetails={deleteBookmarkDetails}
        />
      )}
      {userSettingModal === UserSettingsModalsTypes.editBookmark && (
        <EditBookmark
          modalColorCode={modalColorCode}
          setModalColorCode={setModalColorCode}
          bookmarkValue={bookmarkValue}
          setBookmarkValue={setBookmarkValue}
          handleEditBookmark={handleEditBookmark}
          bookmark={bookmark}
        />
      )}
    </Modal>
  );
};

export default UserSettingModals;
