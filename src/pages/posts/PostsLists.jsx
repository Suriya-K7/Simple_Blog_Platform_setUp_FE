import React, { useContext, useEffect } from "react";
import DataContext from "../../context/DataContext";
import Posts from "../../components/Posts";
import { ToastContainer, Zoom } from "react-toastify";

const PostsLists = () => {
  const { posts, fetchAllPost } = useContext(DataContext);

  const formatedPost = posts
    .slice()
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));

  useEffect(() => {
    fetchAllPost();
  }, []);

  return (
    <div>
      {formatedPost &&
        formatedPost.map((post) => (
          <Posts
            post={post}
            key={post._id}
          />
        ))}
      {!posts.length && <p> No Posts Available</p>}
      <ToastContainer
        position='top-right'
        autoClose={1000}
        transition={Zoom}
        draggable={false}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        pauseOnHover
        theme='dark'
      />
    </div>
  );
};

export default PostsLists;
