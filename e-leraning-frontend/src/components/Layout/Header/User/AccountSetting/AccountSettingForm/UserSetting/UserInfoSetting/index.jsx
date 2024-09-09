"use client";
import { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { profileData, updateProfileIcon } from "@/services/profile";
import { setCookies } from "@/services/server-action-cookies";
import { updateEmail, updateUsername } from "@/services/profile";
import { toast } from "react-toastify";
import { Dialog } from "@mui/material";
import { deleteAllCookies } from "@/services/server-action-cookies";
import ModalCrossIcon from "@/assets/icons/ModalCrossIcon";
import { usePathname } from "next/navigation";
import "./style.scss";

const UserInfoSetting = ({ setShowSetting }) => {
  const [errors, setErrors] = useState({ name: "", password: "", email: "" });
  const [tempPassword, setTempPassword] = useState("");
  const [showPasswordPopup, setShowPasswordPopup] = useState(false);
  const { data: session, update: updateSession } = useSession();
  const { accessToken, user } = session || {};
  const role = user?.role;
  const [userInfo, setUserInfo] = useState({
    email: user?.email,
    icon_url: user?.icon_url,
    username: user?.username,
    bookmark: [],
  });
  const pathname = usePathname();

  const userData = async () => {
    const response = await profileData(role, accessToken);
    updateSession(response.data);
    setCookies("user", JSON.stringify(user), { maxAge: 60 * 60 * 24 * 30 });
  };

  const handleProfilePicChange = async (e) => {
    if (e.target.files[0]?.size > 1000000) {
      toast.error("Max File Size should be 1Mb.");
      return;
    }

    setUserInfo({
      ...userInfo,
      icon_url: URL.createObjectURL(e.target.files[0]),
    });
    const data = new FormData();
    data.append("icon", e.target.files[0]);
    data.append("role", role);
    const res = await updateProfileIcon(data, accessToken);
    if (res?.result === "ok") {
      userData();
    }
    if (!res?.data?.status) {
      toast.error(res?.data?.message);
    } else {
      toast.success(res?.data?.message);
    }
  };

  const onSubmitEmailChange = async () => {
    try {
      const response = await updateEmail(
        { role, password: tempPassword, email: userInfo?.email },
        accessToken
      );
      if (!response?.error?.status) {
        toast.error(response?.error?.message);
      }
      toast.success(response?.data?.message);
    } catch (err) {
      toast.error("Error in changing the email");
    }
  };

  const handleUpdateClick = () => {
    setShowPasswordPopup(true);
  };

  const handlePasswordConfirmation = () => {
    setShowPasswordPopup(false);
    onSubmitEmailChange();
  };

  const onSubmitUserName = async (e) => {
    e.preventDefault();
    if (user?.username === userInfo?.username) {
      return;
    }
    if (!userInfo?.username) {
      setErrors({ ...errors, name: "Username is required" });
      return;
    }

    const response = await updateUsername(
      { role, username: userInfo?.username },
      accessToken
    );
    if (response?.result === "error") {
      setErrors({ ...errors, name: response?.error?.message });
      setTimeout(() => {
        setErrors({ ...errors, name: "" });
      }, 3000);
    } else {
      await userData();
    }
  };
  const handleLogout = async () => {
    await deleteAllCookies();
    if (pathname.includes("topic"))
      sessionStorage.setItem("scrollPosition", window.scrollY);

    setShowSetting(false);
    if (
      pathname.includes("/my-library") ||
      pathname.includes("/my-recently-viewed")
    ) {
      await signOut({ callbackUrl: `/`, redirect: true });
    } else await signOut({ callbackUrl: `${pathname}`, redirect: true });
  };

  return (
    <>
      <div className="logout-btn-container">
        <h2>Account Setting</h2>
        <button className="logout-btn" onClick={handleLogout}>
          Log out
        </button>
      </div>

      <p>Manage your D-libro profile</p>
      <p className="label-text">Profile photo</p>
      <div className="image-input">
        <label htmlFor="file-input">
          {!userInfo?.icon_url || !userInfo?.icon_url.includes("https") ? (
            <div className="input-image-container">
              <p>Drop Image</p>
            </div>
          ) : (
            <img
              className="input-image-container"
              src={userInfo?.icon_url}
              alt="profile"
            />
          )}
          <input
            id="file-input"
            type="file"
            accept="image/*"
            onChange={handleProfilePicChange}
          />
        </label>
      </div>
      <p className="label-text">Username</p>
      <input
        className={errors.name ? "error" : ""}
        name="name"
        placeholder="User"
        value={userInfo?.username}
        onChange={(e) => setUserInfo({ ...userInfo, username: e.target.value })}
        onBlur={onSubmitUserName}
        type="text"
      />
      {errors.name && <p className="error-message">{errors.name}</p>}
      <p className="label-text">Email Address</p>
      <div>
        <input
          type="email"
          placeholder="New Email"
          autoComplete="off"
          value={userInfo?.email}
          onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
          required
        />
        {errors.email && <p className="error-message">{errors.email}</p>}

        <button
          disabled={user?.email === userInfo.email}
          className="update-btn"
          onClick={handleUpdateClick}
        >
          Update
        </button>

        {showPasswordPopup && (
          <Dialog open sx={{ zIndex: 99999999999 }}>
            <div className="password-confirmation-popup">
              <div
                onClick={() => {
                  setShowPasswordPopup(false);
                }}
                className="cross-icon"
              >
                <ModalCrossIcon />
              </div>
              <p className="dialog-heading">Please confirm your password</p>
              <input
                type="password"
                placeholder="Enter your password"
                value={tempPassword}
                onChange={(e) => setTempPassword(e.target.value)}
                required
              />
              <button
                className={tempPassword ? "update-btn" : "disable"}
                onClick={tempPassword ? handlePasswordConfirmation : () => {}}
              >
                Confirm
              </button>
            </div>
          </Dialog>
        )}
      </div>

      {errors.email && <p className="error-message">{errors.email}</p>}
    </>
  );
};

export default UserInfoSetting;
