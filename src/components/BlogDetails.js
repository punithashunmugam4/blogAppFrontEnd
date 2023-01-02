import { useNavigate, useParams } from "react-router-dom";
import { Box, Button, InputLabel, TextField, Typography } from "@mui/material";
import axios from "axios";
import React, { useState, useEffect } from "react";

const BlogDetails = () => {
  const navigate = useNavigate();
  const id = useParams().id;
  const header = {
    authorization: `Bearer ${localStorage.getItem("accessToken")}`,
  };
  const fetchDetails = async () => {
    const res = await axios
      .get(`https://ps-blogappserver.onrender.com/api/blog/${id}`, {
        headers: header,
      })
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };
  useEffect(() => {
    fetchDetails().then((data) => {
      setInputs({
        title: data.blog.title,
        description: data.blog.description,
        imageURL: data.blog.image,
      });
    });
  }, [id]);
  const [inputs, setInputs] = useState();
  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value })); // to dynamically provide key
  };
  const sendRequest = async () => {
    const res = await axios
      .put(
        `https://ps-blogappserver.onrender.com/api/blog/update/${id}`,
        {
          title: inputs.title,
          description: inputs.description,
        },
        { headers: header }
      )
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    sendRequest()
      .then((data) => console.log(data))
      .then(() => navigate("/myblogs"));
  };
  const labelStyle = { mb: 1, mt: 2, fontSize: "24px", fontWeight: "bold" };

  return (
    <div>
      {inputs && (
        <form onSubmit={handleSubmit}>
          <Box
            border={3}
            borderColor="linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,76,121,1) 35%, rgba(0,212,255,1) 100%)"
            borderRadius={10}
            boxShadow="10px 10px 20px #ccc"
            padding={3}
            margin={"auto"}
            marginTop={3}
            display="flex"
            flexDirection={"column"}
            width={"70%"}
          >
            <Typography
              fontWeight={"bold"}
              padding={2}
              color="grey"
              variant="h3"
              textAlign={"center"}
            >
              Post Your Blog
            </Typography>
            <InputLabel sx={labelStyle}>Title</InputLabel>
            <TextField
              name="title"
              value={inputs.title}
              onChange={handleChange}
              variant="outlined"
            />
            <InputLabel sx={labelStyle}>Description</InputLabel>
            <TextField
              name="description"
              value={inputs.description}
              onChange={handleChange}
              variant="outlined"
            />
            <InputLabel sx={labelStyle}>imageURL</InputLabel>
            <TextField
              name="imageURL"
              value={inputs.imageURL}
              onChange={handleChange}
              variant="outlined"
            />
            <Button
              sx={{ borderRadius: 4, mt: 2 }}
              variant="contained"
              type="submit"
              color="warning"
            >
              Submit
            </Button>
          </Box>
        </form>
      )}
    </div>
  );
};

export default BlogDetails;
