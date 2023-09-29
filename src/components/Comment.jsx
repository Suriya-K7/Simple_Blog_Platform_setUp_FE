import React, { useContext, useState } from "react";
import { ToastContainer, Zoom, toast } from "react-toastify";
import api from "../api/api";
import DataContext from "../context/DataContext";

const Comment = ({ data }) => {
  const [view, setView] = useState(false);
  const [editedComment, setEditedComment] = useState("");
  const { config, navigate } = useContext(DataContext);

  const handleEditComment = async () => {
    if (editedComment === "") {
      toast.error("please add comment");
    } else {
      try {
        const comment = {
          comment: editedComment,
        };
        const response = await api.patch(
          `/posts/comments/${data.commentId}`,
          comment,
          config
        );

        toast.success(response.data.message);
        navigate(0);
      } catch (error) {
        toast.success(error.response.data.message);
      }
    }
  };

  const handleDeleteComment = async () => {
    try {
      const response = await api.delete(
        `/posts/comments/${data.commentId}`,
        config
      );

      toast.success(response.data.message);
      navigate(0);
    } catch (error) {
      toast.success(error.response.data.message);
    }
  };

  return (
    <span
      className='btn btn-outline-dark text-white d-flex flex-column gap-2'
      key={data.commentId}
    >
      {data.comment} by {data.name}
      {view && (
        <div className='input-group'>
          <input
            type='text'
            className='form-control'
            onChange={(e) => setEditedComment(e.target.value)}
            value={editedComment}
          />
          <button
            onClick={handleEditComment}
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
          onClick={handleDeleteComment}
          className='btn btn-outline-danger'
        >
          Delete
        </button>
      </div>
    </span>
  );
};

export default Comment;
