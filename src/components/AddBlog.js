import { Box, Button, InputLabel, TextField, Typography } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddBlog = () => {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    title: "",
    description: "",
    imageURL: "",
  });
  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value })); // to dynamically provide key
  };
  const header = {
    authorization: `Bearer ${localStorage.getItem("accessToken")}`,
  };
  // console.log(header);
  const sendRequest = async () => {
    const res = await axios
      .post(
        "https://ps-blogappserver.onrender.com/api/blog/add",
        {
          title: inputs.title,
          description: inputs.description,
          image: inputs.imageURL,
          user: localStorage.getItem("userId"),
        },
        { headers: header }
      )
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    sendRequest().then(() => navigate("/myblogs"));
  };
  const labelStyle = { mb: 1, mt: 2, fontSize: "24px", fontWeight: "bold" };
  return (
    <div>
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
    </div>
  );
};

export default AddBlog;
