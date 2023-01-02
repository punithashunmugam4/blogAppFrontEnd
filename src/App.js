import "./App.css";
import Header from "./components/Header";
import Blogs from "./components/Blogs";
import UserBlogs from "./components/UserBlogs";
import AddBlog from "./components/AddBlog";
import BlogDetails from "./components/BlogDetails";
import { Route, Routes } from "react-router-dom";
import Auth from "./components/Auth";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { authActions } from "./store";

function App() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  console.log(isLoggedIn);

  useEffect(() => {
    if (localStorage.getItem("userId")) {
      dispatch(authActions.login());
    }
  }, [dispatch]);

  return (
    <>
      <header>
        <Header />
      </header>
      <main>
        <Routes>
          {!isLoggedIn ? (
            <>
              <Route path="/auth" element={<Auth />} />
              <Route path="/" element={<Auth />} />
            </>
          ) : (
            <>
              <Route path="/blogs" element={<Blogs />} />
              <Route path="/myblogs" element={<UserBlogs />} />
              <Route path="/myblogs/:id" element={<BlogDetails />} />
              <Route path="/blogs/add" element={<AddBlog />} />
            </>
          )}
        </Routes>
      </main>
    </>
  );
}

export default App;
