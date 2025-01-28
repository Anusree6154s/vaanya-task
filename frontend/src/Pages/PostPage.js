import { Box, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar/Navbar";

export default function PostPage({ toggleSidebar, handleOpenAdd }) {
  const [post, setPost] = useState(null);

  useEffect(() => {
    const localStoragePost = localStorage.getItem("post");
    if (localStoragePost) {
      setPost(JSON.parse(localStoragePost));
    }
  }, []);

  return (
    <>
      {post && (
        <Stack spacing={2} sx={{ overflowY: "hidden" }}>
          <Navbar
            toggleSidebar={toggleSidebar}
            handleOpen={handleOpenAdd}
            pageName="Blog Post"
          />
          <Box
            id="content"
            sx={{
              display: "flex",
              gap: 4,
              margin: "100px !important",
              marginTop: "100px !important",
              //   padding: "20px",
              //   borderRadius: "10px",
              //   background: "#f5f5f5",
              //   height: "75vh",
              //   overflowY: "auto",
              //   scrollbarWidth: "thin",
              flexDirection: { xs: "column", sm: "row" },
              alignItems: { xs: "center", sm: "flex-start" },
            }}
          >
            <Box
              className=""
              sx={{
                width: { xs: "100%", sm: 200 },
                height: 300,
                backgroundImage: `url(${
                  post.image ? post.image : "/assets/preview-image.jpg"
                })`,
                backgroundSize: "contain",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                border: "1px solid #ddd",
                borderRadius: "8px",
                flex: { xs: "none", sm: 1 },
              }}
            ></Box>
            <Stack gap={4} sx={{ flex: 2 }}>
              <Typography variant="h4">{post.title}</Typography>
              <Typography variant="body1" sx={{ marginLeft: "5px" }}>
                {post.body}
              </Typography>
            </Stack>
          </Box>
        </Stack>
      )}
    </>
  );
}
