import React, { useContext } from "react";
import "./App.css";
import DataContext from "./context/DataContext";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/login/Login";
import Forgot from "./pages/forgotPassword/Forgot";
import Register from "./pages/register/Register";
import Logout from "./pages/logout/Logout";
import Reset from "./pages/resetPassword/Reset";
import ConfirmUser from "./pages/confirmUser/ConfirmUser";
import NavBar from "./components/NavBar";
import PostsLists from "./pages/posts/PostsLists";
import Addpost from "./pages/addpost/Addpost";
import ViewPost from "./pages/viewPost/ViewPost";

const App = () => {
  const { loggedUser } = useContext(DataContext);

  return (
    <div>
      {loggedUser && (
        <>
          <NavBar />
        </>
      )}
      <Routes>
        {!loggedUser && (
          <>
            <Route
              path='/'
              element={<Login />}
            />
            <Route
              path='/login'
              element={<Login />}
            />
            <Route
              path='/forgot'
              element={<Forgot />}
            />
            <Route
              path='/register'
              element={<Register />}
            />
            <Route
              path='/reset/:id'
              element={<Reset />}
            />
            <Route
              path='/confirm/:id'
              element={<ConfirmUser />}
            />
            <Route
              path='/*'
              element={<Logout />}
            />
          </>
        )}
        {loggedUser && (
          <>
            <Route
              path='/posts'
              element={<PostsLists />}
            />
            <Route
              path='/'
              element={<PostsLists />}
            />
            <Route
              path='/addPost'
              element={<Addpost />}
            />
            <Route
              path='/posts/:id'
              element={<ViewPost />}
            />
          </>
        )}
      </Routes>
    </div>
  );
};

export default App;
