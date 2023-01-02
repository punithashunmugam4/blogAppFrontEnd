import { Button, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { authActions } from "../store";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [inputs, setinputs] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [isSignup, setisSignup] = useState(false);
  const handleChange = (e) => {
    setinputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const sendRequest = async (type = "login") => {
    const res = await axios
      .post(`http://localhost:5000/api/user/${type}`, {
        name: inputs.name,
        email: inputs.email,
        password: inputs.password,
      })
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
    if (isSignup) {
      sendRequest("signup")
        .then(() => dispatch(authActions.login()))
        .then(() => navigate("/blogs"))
        .then((data) => console.log(data));
    } else {
      sendRequest()
        .then((data) => {
          console.log(data);
          localStorage.setItem("accessToken", data.token);
          localStorage.setItem("userId", data.user._id);
        })
        .then(() => dispatch(authActions.login()))
        .then(() => navigate("/blogs"))
        .then((data) => console.log(data));
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Box
          maxWidth={800}
          display={"flex"}
          flexDirection={"column"}
          alignItems="center"
          justifyContent={"center"}
          boxShadow="18px 18x 20px #ccc"
          padding={3}
          margin="auto"
          marginTop={3}
          borderRadius={5}
        >
          <Typography variant="h2" padding={3} textAlign="center">
            {isSignup ? "Register" : "Login"}
          </Typography>
          {isSignup && (
            <TextField
              sx={{ width: "400px" }}
              name="name"
              onChange={handleChange}
              value={inputs.name}
              placeholder="Name"
              margin="normal"
            />
          )}
          <TextField
            sx={{ width: "400px" }}
            name="email"
            onChange={handleChange}
            value={inputs.email}
            type={"email"}
            placeholder="Email"
            margin="normal"
          />
          <TextField
            sx={{ width: "400px" }}
            name="password"
            onChange={handleChange}
            value={inputs.password}
            type={"password"}
            placeholder="Password"
            margin="normal"
          />
          <Button
            type="submit"
            variant="contained"
            color="warning"
            sx={{ borderRadius: 3, marginTop: 3 }}
          >
            Submit
          </Button>
          <Button
            sx={{ borderRadius: 3, marginTop: 3 }}
            onClick={() => setisSignup(!isSignup)}
          >
            Change to {isSignup ? "Login" : "SignUp"}
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default Auth;
