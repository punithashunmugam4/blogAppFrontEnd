import React from "react";
import Blog from "./Blog";
import axios from "axios";
import { useState, useEffect } from "react";

const UserBlogs = () => {
  const [user, setUser] = useState();
  const id = localStorage.getItem("userId");
  const header = `Authorization: Bearer ${localStorage.getItem("accessToken")}`;
  const sendRequest = async () => {
    const res = await axios
      .get(`https://ps-blogappserver.onrender.com/api/blog/user/${id}`, {
        headers: header,
      })
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };
  useEffect(() => {
    sendRequest().then((data) => setUser(data.user));
  }, []);
  console.log(user);
  return (
    <div>
      {user &&
        user.blogs &&
        user.blogs.map((blog, index) => (
          <Blog
            id={blog._id}
            key={index}
            isuser={true}
            title={blog.title}
            description={blog.description}
            imageURL={blog.image}
            userName={user.name}
          />
        ))}
    </div>
  );
};

export default UserBlogs;
