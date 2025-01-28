import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Button, Stack, TextField } from "@mui/material";
import { addPost, updatePost } from "../../api/posts.api";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
export default function EditPostsDialog({
  open,
  handleClose,
  setRefresh,
  post,
}) {
  const [formData, setFormData] = useState({
    title: post.title,
    body: post.body,
  });

  const handleSubmit = () => {
    updatePost(post._id, formData);
    setRefresh(true);
    handleClose();
  };

  useEffect(() => {
    setFormData({ title: post.title, body: post.body });
  }, [post]);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography
          id="modal-modal-title"
          variant="h6"
          component="h2"
          className="text-center"
        >
          Edit Post
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          <Stack spacing={2}>
            <TextField
              id="outlined-basic"
              label="Enter post title"
              value={formData.title}
              variant="outlined"
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, title: e.target.value }))
              }
            />
            <TextField
              id="outlined-basic"
              label="Enter post body"
              value={formData.body}
              variant="outlined"
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, body: e.target.value }))
              }
            />
            <Button variant="contained" onClick={handleSubmit}>
              Update Post
            </Button>
          </Stack>
        </Typography>
      </Box>
    </Modal>
  );
}
