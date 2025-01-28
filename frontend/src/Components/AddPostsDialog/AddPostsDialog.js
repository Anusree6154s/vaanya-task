import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import {
  Button,
  FormControl,
  FormLabel,
  Stack,
  TextField,
} from "@mui/material";
import { addPost } from "../../api/posts.api";

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
  maxHeight: "80vh",
  overflowY: "auto",
  scrollbarWidth: "thin",
};

export default function AddPostsDialog({
  open,
  handleClose,
  setRefresh,
  setIsPostAdded,
}) {
  const [formData, setFormData] = useState({ image: "", title: "", body: "" });

  const handleSubmit = () => {
    addPost(formData);
    setRefresh(true);
    setIsPostAdded(true);
    handleClose();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setFormData((prevData) => ({
          ...prevData,
          image: reader.result, // Save the image as a data URL
        }));
      };

      reader.readAsDataURL(file);
    }
  };

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
          Add Post
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          <Stack spacing={2}>
            <TextField
              id="outlined-basic"
              label="Enter post title"
              variant="outlined"
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, title: e.target.value }))
              }
            />
            <TextField
              id="outlined-basic"
              label="Enter post body"
              variant="outlined"
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, body: e.target.value }))
              }
            />

            <FormControl
              component="fieldset"
              sx={{ border: "1px solid #ccc", p: 2, borderRadius: 1 }}
            >
              <FormLabel
                component="legend"
                sx={{ fontSize: "15px", mb: 1, color: "#757474" }}
              >
                Image
              </FormLabel>
              <Stack
                spacing={2}
                sx={{ textAlign: "center", alignItems: "center" }}
              >
                <Box
                  className=""
                  sx={{
                    width: 200,
                    height: 150,
                    backgroundImage: `url(${
                      formData.image
                        ? formData.image
                        : "/assets/preview-image.jpg"
                    })`,
                    backgroundSize: "contain",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    border: "1px solid #ddd",
                    borderRadius: "8px",
                  }}
                ></Box>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-[75%]"
                />
                <Typography>OR</Typography>
                <TextField
                  id="outlined-basic"
                  label="Enter post image url"
                  variant="outlined"
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, image: e.target.value }))
                  }
                />
              </Stack>
            </FormControl>
            <Button variant="contained" onClick={handleSubmit}>
              Submit Post
            </Button>
          </Stack>
        </Typography>
      </Box>
    </Modal>
  );
}
