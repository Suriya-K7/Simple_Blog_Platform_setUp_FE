import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import DataContext from "../context/DataContext";

const NavBar = () => {
  const { loggedUser, handleLogout } = useContext(DataContext);

  const name = loggedUser.name;

  return (
    <nav className='navbar navbar-expand-md navbar-dark bg-dark'>
      <div className='container-fluid'>
        <div className='navbar-brand'>Mini Social Blog</div>
        <div className='navbar-brand '>Hi {name} !</div>
        <button
          className='navbar-toggler'
          type='button'
          data-bs-toggle='collapse'
          data-bs-target='#mynavbar'
        >
          <span className='navbar-toggler-icon'></span>
        </button>
        <div
          className='collapse navbar-collapse'
          id='mynavbar'
        >
          <ul className='navbar-nav me-auto gap-2'>
            <li className='nav-item btn btn-secondary'>
              <NavLink
                to={"/posts"}
                className='nav-link'
              >
                Posts
              </NavLink>
            </li>
            <li className='nav-item btn btn-secondary'>
              <NavLink
                to={"/addPost"}
                className='nav-link'
              >
                AddPosts
              </NavLink>
            </li>
            <li className='nav-item btn btn-secondary'>
              <NavLink
                to={"/login"}
                onClick={handleLogout}
                className='nav-link'
              >
                Logout
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
