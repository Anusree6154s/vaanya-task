import { Box } from "@mui/material";
import React from "react";
import Navbar from "../Components/Navbar/Navbar";
import Posts from "../Components/Posts/Posts";

export default function HomePage({
  toggleSidebar,
  handleOpenAdd,
  pageName,
  refresh,
  setRefresh,
  handleOpenEdit,
  setPost,
  isPostAdded,
  setIsPostAdded,
}) {
  return (
    <Box sx={{ display: "flex", gap: 2 }}>
      <Navbar
        toggleSidebar={toggleSidebar}
        handleOpen={handleOpenAdd}
        pageName={pageName}
      />
      <Posts
        refresh={refresh}
        sx={{ flex: 1.5 }}
        setRefresh={setRefresh}
        handleOpen={handleOpenEdit}
        setPost={setPost}
        isPostAdded={isPostAdded}
        setIsPostAdded={setIsPostAdded}
      />
    </Box>
  );
}
