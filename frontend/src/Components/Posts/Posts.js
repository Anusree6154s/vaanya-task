import { useEffect, useRef, useState } from "react";
import { deletePost, getPosts } from "../../api/posts.api";
import { setRef, Stack } from "@mui/material";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export default function Posts({ refresh, setRefresh, handleOpen, setPost, isPostAdded,setIsPostAdded }) {
  const [data, setData] = useState(null);
  const lastPostRef = useRef(null);

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
        setIsPostAdded(false)
      }
    };

    fetchData();
  }, [isPostAdded, refresh, setIsPostAdded, setRefresh]);


  const handleEdit = (post) => {
    setPost(post);
    handleOpen();
  };
  const handleDelete = (id) => {
    deletePost(id);
    setRefresh(true);
  };

  return (
    <div className="mt-20 h-full w-full mr-10 mb-10">
      <Stack spacing={4}>
        {data &&
          data.length !== 0 &&
          data.map((item, index) => (
            <Card
              sx={{ width: "100%", background: "#ededed" }}
              ref={index === data.length - 1 ? lastPostRef : null}
            >
              <CardContent>
                <Stack spacing={2}>
                  <Typography variant="h5" component="div">
                    {item.title}
                  </Typography>
                  <Typography variant="body2">{item.body}</Typography>
                  <Box sx={{ display: "flex", gap: 2 }}>
                    <Button variant="outlined" onClick={() => handleEdit(item)}>
                      Edit
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => handleDelete(item._id)}
                    >
                      Delete
                    </Button>
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          ))}
      </Stack>
    </div>
  );
}
