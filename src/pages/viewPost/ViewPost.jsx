import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../../api/api";
import DataContext from "../../context/DataContext";
import { ToastContainer, Zoom, toast } from "react-toastify";
import TimeAgo from "../../components/TimeAgo";

const ViewPost = () => {
  const { id } = useParams();

  const [view, setView] = useState(false);
  const [editedpost, setEditedPost] = useState("");
  const { config, navigate } = useContext(DataContext);

  const [post, setPost] = useState([]);

  const fetchOnePost = async () => {
    try {
      const response = await api.get(`/posts/${id}`, config);
      setPost(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditPost = async () => {
    if (editedpost === "") {
      toast.error("please add comment");
    } else {
      try {
        const post = {
          description: editedpost,
        };
        const response = await api.patch(`/posts/${id}`, post, config);

        toast.success(response.data.message);
        navigate(0);
      } catch (error) {
        toast.success(error.response.data.message);
      }
    }
  };

  const handleDeletePost = async () => {
    try {
      const response = await api.delete(`/posts/${id}`, config);

      toast.success(response.data.message);
      setTimeout(() => {
        navigate("/posts");
      }, 2000);
    } catch (error) {
      toast.success(error.response.data.message);
    }
  };

  useEffect(() => {
    fetchOnePost();
  }, []);

  return (
    <article>
      <h3>Posted By {post.name}</h3>
      <p>Description :- {post.description}</p>
      <TimeAgo timestamp={post.createdAt} />
      <br />
      {view && (
        <div className='input-group'>
          <input
            type='text'
            className='form-control'
            onChange={(e) => setEditedPost(e.target.value)}
            value={editedpost}
          />
          <button
            onClick={handleEditPost}
            className='btn btn-success'
          >
            Save
          </button>
        </div>
      )}
      <div className='mt-1 d-flex gap-3 justify-content-center'>
        <button
          onClick={() => setView(!view)}
          className='btn btn-outline-warning'
        >
          Edit
        </button>
        <button
          onClick={handleDeletePost}
          className='btn btn-outline-danger'
        >
          Delete
        </button>
      </div>
      <Link
        to={"/"}
        className='mt-2 btn btn-outline-secondary'
      >
        Go Back to All post
      </Link>
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

export default ViewPost;
