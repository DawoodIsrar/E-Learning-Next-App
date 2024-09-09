"use client";
import { useState, useEffect } from "react";
import BookmarkInputs from "./BookmarkInputs";
import UserInfoSetting from "./UserSetting/UserInfoSetting";
import { UserSettingsModalsTypes } from "@/utils";
import { useSession } from "next-auth/react";
import UserSettingModals from "@/components/UserSettingModals";
import { deleteBookmark, showAllBookmark } from "@/services/bookmark";
import "./style.scss";

const AccountSettingForm = ({ setShowSetting }) => {
  const { data: session } = useSession();
  const { accessToken, user } = session || {};
  const [userSettingModal, setUserSettingModal] = useState("");
  const [userSettingModalOpen, setUserSettingModalOpen] = useState(false);
  const [bookmarks, setBookmarks] = useState(() => []);
  const [bookMark, setBookmark] = useState("");
  const [disabled, setDisabled] = useState(false);

  const handleAddnewDisabled = (value) => {
    setDisabled(value);
  };

  const handleUpdateBookmark = (bookMark) => {
    setBookmark(bookMark);
    handleUserSettingModal(UserSettingsModalsTypes.deleteBookmarks);
  };

  const handleShowAllBookmark = async () => {
    const response = await showAllBookmark(user?.role, accessToken);
    if (response?.length)
      setBookmarks([...response?.sort((a, b) => a.id - b.id)]);
  };

  const handleAddNewBookmark = () => {
    setDisabled(true);
    setBookmarks([
      ...bookmarks,
      {
        id: null,
        name: "",
        color: "#000",
        role: user?.role,
      },
    ]);
  };
  const handleUserSettingModal = (modal) => {
    setUserSettingModal(modal);
    setUserSettingModalOpen(true);
  };
  const handleBookmarkChange = (index, newBookmark) => {
    if (newBookmark) {
      let tempBookmarkList = [...bookmarks];
      tempBookmarkList[index] = newBookmark;

      setBookmarks([...tempBookmarkList]);
    }
  };

  const handleDeleteBookmarks = async () => {
    setDisabled(true);
    try {
      const response = await deleteBookmark(
        session?.user?.role,
        bookMark.id,
        session?.accessToken
      );
      if (response?.status) {
        handleUserSettingModal(UserSettingsModalsTypes.deleteBookmarksSuccess);
        setBookmarks((prevBookmarks) =>
          prevBookmarks.filter((bookmark) => bookmark.id !== bookMark.id)
        );
      }
    } catch (error) {
      console.log("error", error?.message);
    } finally {
      setDisabled(false);
    }
  };
  useEffect(() => {
    if (accessToken) {
      handleShowAllBookmark();
    }
  }, [accessToken]);

  return (
    <div className="account-setting-main">
      <div className="account-setting-container">
        <UserInfoSetting setShowSetting={setShowSetting} />
        <p className="bookmark-label-text">Bookmarks</p>
        <div>
          {bookmarks.map((bookmark, index) => {
            return (
              <BookmarkInputs
                setAddnewDisabled={handleAddnewDisabled}
                index={index}
                key={bookmark?.id || index}
                bookmark={bookmark}
                setBookmark={(newBookmark) => {
                  handleBookmarkChange(index, newBookmark);
                }}
                deleteBookmarks={() => handleUpdateBookmark(bookmark)}
              />
            );
          })}
        </div>

        <button
          disabled={disabled}
          className="add-btn"
          onClick={handleAddNewBookmark}
        >
          Add new
        </button>
        <UserSettingModals
          isOpen={userSettingModalOpen}
          setIsOpen={setUserSettingModalOpen}
          userSettingModal={userSettingModal}
          setUserSettingModal={setUserSettingModal}
          token={accessToken}
          deleteBookmarkDetails={bookMark}
          handleDeleteBookmark={handleDeleteBookmarks}
          disabled={disabled}
          setShowSetting={setShowSetting}
        />
        <h4 className="pass-delete-title">Password</h4>
        <p className="login_intro">
          You can set a permanent password if you don't want to use temporary
          login codes.
        </p>
        <button
          className="change-password-btn"
          onClick={() =>
            handleUserSettingModal(UserSettingsModalsTypes.changePassword)
          }
        >
          Change password
        </button>
        <h4 className="pass-delete-title">Delete account</h4>
        <p className="login_intro">
          Permanently delete your account and all of your content.
        </p>
        <button
          className="delete-btn"
          onClick={() =>
            handleUserSettingModal(UserSettingsModalsTypes.settings)
          }
        >
          Delete this account
        </button>
      </div>
    </div>
  );
};

export default AccountSettingForm;
