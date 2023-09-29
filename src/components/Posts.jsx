import React, { useContext, useEffect, useState } from "react";
import TimeAgo from "./TimeAgo";
import api from "../api/api";
import DataContext from "../context/DataContext";
import { ToastContainer, Zoom, toast } from "react-toastify";
import { Link } from "react-router-dom";
import Comment from "./Comment";

const Posts = ({ post }) => {
  const [comment, setComment] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [view, setView] = useState(false);
  const { config, navigate } = useContext(DataContext);

  const fetchComments = async () => {
    try {
      const response = await api.get(`/posts/comments/${post._id}`, config);
      const formatedComment = response.data.map((data) => {
        let comment = {
          comment: data.comment,
          user: data.user,
          commentId: data._id,
          postId: data.post,
          name: data.name,
        };
        return comment;
      });
      setComment(formatedComment);
    } catch (error) {
      console.log(error);
    }
  };

  const addComment = async () => {
    if (newComment === "") {
      toast.error("Please add comment");
    } else {
      try {
        const data = {
          comment: newComment,
        };
        const response = await api.post(
          `/posts/comments/${post._id}`,
          data,
          config
        );

        toast.success(response.data.message);
        navigate(0);
      } catch (error) {
        toast.success(error.message);
      }
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  return (
    <article>
      <Link
        to={`/posts/${post._id}`}
        className='viewBtn'
      >
        Manage
      </Link>
      <h3>Posted By {post.name}</h3>
      <p>Description :- {post.description}</p>
      <TimeAgo timestamp={post.createdAt} />
      <br />
      <div className='d-flex justify-content-center gap-2'>
        <p
          className='btn btn-outline-secondary text-white'
          onClick={() => setView(!view)}
        >
          View comments {`( ${post.comments.length} )`}
        </p>
        <div className='d-flex align-items-baseline gap-2'>
          <input
            type='text'
            placeholder='Enter Comments...'
            className='btn btn-outline-secondary border'
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <p
            className='btn btn-outline-secondary text-white'
            onClick={addComment}
          >
            Add Comment
          </p>
        </div>
      </div>
      <div className='d-flex flex-column gap-1 align-items-center'>
        {view &&
          comment &&
          comment.map((data) => (
            <Comment
              data={data}
              key={data.commentId}
            />
          ))}
      </div>
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
    </article>
  );
};

export default Posts;
