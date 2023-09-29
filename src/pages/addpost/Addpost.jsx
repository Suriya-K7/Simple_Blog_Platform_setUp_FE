import React, { useContext, useState } from "react";
import api from "../../api/api";
import DataContext from "../../context/DataContext";
import { ToastContainer, Zoom, toast } from "react-toastify";

const Addpost = () => {
  const [description, setDescription] = useState("");
  const { loggedUser, config } = useContext(DataContext);

  const handlePostSubmit = async (e) => {
    e.preventDefault();

    const data = {
      userId: loggedUser._id,
      description,
    };

    try {
      const response = await api.post(`/posts`, data, config);
      toast.success(response.data.message);
      setDescription("");
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <section>
      <h2>Add a New Post</h2>
      <form
        className='d-flex gap-3'
        onSubmit={handlePostSubmit}
      >
        <label htmlFor='postTitle'>Post Description:</label>
        <input
          type='text'
          id='postTitle'
          placeholder='enter post description'
          name='postTitle'
          className='form-control w-75 mx-auto text-center'
          value={description}
          required
          onChange={(e) => setDescription(e.target.value)}
        />
        <button
          className=' btn btn-success w-25 mx-auto'
          type='submit'
        >
          Post
        </button>
      </form>
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
    </section>
  );
};

export default Addpost;
