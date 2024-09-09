"use client";
import { Box } from "@material-ui/core";
import { CircularProgress } from "@mui/material";

const SharedCircularProgress = () => {
  return (
    <Box sx={{ display: "flex", justifyContent: "center", marginTop: "50px" }}>
      <CircularProgress color="inherit" size={30} />
    </Box>
  );
};

export default SharedCircularProgress;
