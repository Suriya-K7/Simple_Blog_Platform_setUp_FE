import React, { useContext, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { ToastContainer, Zoom } from "react-toastify";
import DataContext from "../../context/DataContext";

const ConfirmUser = () => {
  const { handleConfirm, setResetToken, isLoading } = useContext(DataContext);

  const { id } = useParams();

  useEffect(() => {
    setResetToken(id);
  }, []);

  return (
    <div className='loggedOut'>
      <div className='body__container p-5 rounded text-center'>
        <h1 className='text-center text-light mb-4'>Mini Social Blog</h1>
        <h3 className='text-center mb-4'>
          Please click Below button to confirm Your account.
        </h3>
        <button
          onClick={handleConfirm}
          className='btn btn-success mb-4'
        >
          {isLoading ? (
            <span className='spinner-border spinner-border-sm text-warning'></span>
          ) : (
            <span>Activate Account</span>
          )}
        </button>
        <div className='text-center'>
          <Link
            to='/'
            className='btn btn-success'
          >
            cancel
          </Link>
        </div>
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
    </div>
  );
};

export default ConfirmUser;
