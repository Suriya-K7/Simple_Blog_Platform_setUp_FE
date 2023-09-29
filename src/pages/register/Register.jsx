import React, { useContext } from "react";
import "./register.css";
import { ToastContainer, Zoom } from "react-toastify";
import { Formik, Form } from "formik";
import TextField from "../../components/TextField";
import * as Yup from "yup";
import DataContext from "../../context/DataContext";
import { Link } from "react-router-dom";
import { FaRocketchat } from "react-icons/fa";

const Register = () => {
  const { handleRegister, isLoading } = useContext(DataContext);

  const validate = Yup.object({
    name: Yup.string()
      .max(25, "Must be less than 15 Characters")
      .min(3, "Must be at least 6 Characters")
      .required("Required"),
    email: Yup.string().email("Email is Invalid").required("Required"),
    password: Yup.string()
      .max(15, "Must be less than 15 Characters")
      .min(1, "Must be at least 6 Characters")
      .required("Required"),
    cPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Password Must Match")
      .required("Required"),
  });

  return (
    <section className='register'>
      <div className='p-2'>
        <div className='container d-flex justify-content-center'>
          <div className='register__form'>
            <h1
              style={{ color: "var(--theme)" }}
              className='text-center'
            >
              Mini Social Blog
            </h1>
            <Formik
              initialValues={{
                name: "",
                email: "",
                password: "",
                cPassword: "",
              }}
              validationSchema={validate}
              onSubmit={(values, { resetForm }) => {
                handleRegister(values);
                resetForm({ values: "" });
              }}
            >
              {({ values, setFieldValue }) => (
                <Form>
                  <div className='detailCards'>
                    <h2
                      style={{ color: "var(--theme" }}
                      className='text-center'
                    >
                      Register
                    </h2>
                    <TextField
                      label='Name'
                      name='name'
                      id='name'
                      type='text'
                      placeholder='Enter Your Name'
                    />
                    <TextField
                      label='Email'
                      name='email'
                      id='email'
                      type='email'
                      placeholder='Enter Your Email'
                    />
                    <TextField
                      label='Password'
                      name='password'
                      id='password'
                      type='password'
                      placeholder='Enter Password'
                    />
                    <TextField
                      label='Confirm Password'
                      name='cPassword'
                      id='cPassword'
                      type='password'
                      placeholder='Confirm Password'
                    />
                    <div className='text-center mt-3'>
                      <button
                        className='text-white button rounded'
                        type='submit'
                      >
                        {isLoading ? (
                          <span className='spinner-border spinner-border-sm text-warning'></span>
                        ) : (
                          <span>Register</span>
                        )}
                      </button>
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
            <div className='text-center'>
              <Link
                to={"/login"}
                className='text-white btn btn-success button rounded mt-3'
              >
                Go To Login
              </Link>
            </div>
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
    </section>
  );
};

export default Register;
