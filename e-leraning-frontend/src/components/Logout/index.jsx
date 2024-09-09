"use client";

import CircularProgress from "@mui/material/CircularProgress";
import { signOut } from "next-auth/react";
import Box from "@mui/material/Box";
import { useEffect } from "react";
import "@/assets/scss/index.scss";
import { deleteAllCookies } from "@/services/server-action-cookies";

const Logout = () => {
  useEffect(() => {
    handleLogout();
  }, []);

  const handleLogout = async () => {
    await deleteAllCookies();
    await signOut({ callbackUrl: "/", redirect: true });
  };

  return (
    <div className="logoutPage">
      <h3>Something went wrong. Logging you out...</h3>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          marginTop: "30px",
        }}
      >
        <CircularProgress color="inherit" size={30} />
      </Box>
    </div>
  );
};

export default Logout;
