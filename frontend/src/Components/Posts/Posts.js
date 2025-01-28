import { useEffect, useRef, useState } from "react";
import { deletePost, getPosts } from "../../api/posts.api";
import { setRef, Stack } from "@mui/material";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";

export default function Posts({
  refresh,
  setRefresh,
  handleOpen,
  setPost,
  isPostAdded,
  setIsPostAdded,
}) {
  const [data, setData] = useState(null);
  const lastPostRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const data = await getPosts();
      setData(data.data);
      setRefresh(false);
      if (isPostAdded) {
        setTimeout(() => {
          if (lastPostRef.current) {
            lastPostRef.current.scrollIntoView({ behavior: "smooth" });
          }
        }, 100);
        setIsPostAdded(false);
      }
    };

    fetchData();
  }, [isPostAdded, refresh, setIsPostAdded, setRefresh]);

  const handleEdit = (e, post) => {
    e.stopPropagation();
    setPost(post);
    handleOpen();
  };
  const handleDelete = (e, id) => {
    e.stopPropagation();
    deletePost(id);
    setRefresh(true);
  };

  const handlePost = (post) => {
    localStorage.setItem("post", JSON.stringify(post));
    navigate(`/post/${post._id}`);
  };

  return (
    <div className="mt-20 pt-5 m-10 h-full w-[90vw]">
      <Stack spacing={4}>
        {data &&
          data.length !== 0 &&
          data.map((item, index) => (
            <Card
              sx={{
                width: "100%",
                background: "#ededed",
                cursor: "pointer",
                "&:hover": {
                  background: "#f0f0f0",
                },
              }}
              ref={index === data.length - 1 ? lastPostRef : null}
              onClick={() => handlePost(item)}
              key={item._id}
            >
              <CardContent>
                <Box
                  sx={{
                    display: "flex",
                    gap: 2,
                    flexDirection: { xs: "column", sm: "row" },
                    alignItems: { xs: "center", sm: "flex-start" },
                  }}
                >
                  <Box
                    className=""
                    sx={{
                      width: { xs: "100%", sm: 100 },
                      height: 100,
                      backgroundImage: `url(${
                        item.image ? item.image : "/assets/preview-image.jpg"
                      })`,
                      backgroundSize: "contain",
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat",
                      border: "1px solid #ddd",
                      borderRadius: "8px",
                      flex: { xs: "none", sm: 1 },
                    }}
                  ></Box>
                  <Stack spacing={2} sx={{ flex: 4, width:"70%" }}>
                    <Typography variant="h5" component="div">
                      {item.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        width: "100%",
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {item.body}
                    </Typography>
                    <Box sx={{ display: "flex", gap: 2 }}>
                      <Button
                        variant="outlined"
                        onClick={(e) => handleEdit(e, item)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="outlined"
                        color="error"
                        onClick={(e) => handleDelete(e, item._id)}
                      >
                        Delete
                      </Button>
                    </Box>
                  </Stack>
                </Box>
              </CardContent>
            </Card>
          ))}
      </Stack>
    </div>
  );
}
