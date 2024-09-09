"use client";
import { useState } from "react";
import UserIcon from "@/assets/icons/UserIcon";
import AccountSetting from "./AccountSetting";
import { useSession } from "next-auth/react";
import Image from "next/image";
import "./style.scss";

const UserComponent = ({ handleMenu, userData }) => {
  const { data: session } = useSession();
  const { user, status } = session || {};
  const [showSetting, setShowSetting] = useState(false);
  userData = status === "loading" ? userData && JSON.parse(userData) : user;

  return (
    <>
      <div
        onClick={() => {
          setShowSetting((prev) => !prev);
          handleMenu(false);
        }}
        className="header-menu-btn"
      >
        {userData?.icon_url && userData.icon_url?.includes("https") ? (
          <Image
            priority
            alt="user icon description"
            src={userData?.icon_url}
            width={45}
            height={45}
          />
        ) : (
          <UserIcon width={"16"} height={"16"} alt="not provided" />
        )}
      </div>

      <AccountSetting
        showSetting={showSetting}
        setShowSetting={setShowSetting}
      />
    </>
  );
};

export default UserComponent;
