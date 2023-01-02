import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import Blog from "./Blog";

const Blogs = () => {
  const [blogs, setblogs] = useState();
  const sendRequest = async () => {
    const header = `authorization: Bearer ${localStorage.getItem(
      "accessToken"
    )}`;
    const res = await axios
      .get("https://ps-blogappserver.onrender.com/api/blog", {
        headers: header,
      })
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };
  useEffect(() => {
    sendRequest().then((data) => setblogs(data.blogs));
  }, []);
  console.log(blogs);
  return (
    <div>
      {blogs &&
        blogs.map((blog, index) => (
          <Blog
            key={index}
            isuser={localStorage.getItem("userId") == blog.user._id}
            title={blog.title}
            description={blog.description}
            imageURL={blog.image}
            userName={blog.user.name}
          />
        ))}
    </div>
  );
};

export default Blogs;
