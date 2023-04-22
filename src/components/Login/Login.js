import React, { useEffect, useState } from "react";
import Header from "../Header/Header";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useForm } from "react-hook-form";
import LoginError from "../LoginError/LoginError";
import Spinner from "../Spinner/Spinner";

const Login = () => {
  const navigate = useNavigate();
  const {
    loading,
    setLoading,
    loginWithGoogle,
    loginUser,
    authError,
    setAuthError,
  } = useAuth();

  // handle login with google
  const handleLoginWithGoogle = (navigate) => {
    setLoading(true);
    loginWithGoogle(navigate);
  };

  // handle login with email and password
  const handleLogin = (email, password, navigate) => {
    setLoading(true);
    loginUser(email, password, navigate);
  };

  const { register, handleSubmit, errors } = useForm();
  const onSubmit = (data) => {
    handleLogin(data?.email, data?.password, navigate);
  };

  return (
    <>
      <Header />
      {loading ? (
        <Spinner />
      ) : (
        <div className="container">
          <div className="row justify-content-center mt-5">
            <div className="col-md-6">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title text-center mb-4">Login</h5>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-3">
                      <label htmlFor="inputEmail" className="form-label">
                        Email address
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        id="inputEmail"
                        placeholder="Enter email"
                        required
                        {...register("email", { required: true })}
                      />
                      {errors?.email && (
                        <span className="text-warning">
                          This field is required
                        </span>
                      )}
                    </div>
                    <div className="mb-3">
                      <label htmlFor="inputPassword" className="form-label">
                        Password
                      </label>
                      <input
                        type="password"
                        className="form-control"
                        id="inputPassword"
                        placeholder="Enter password"
                        required
                        {...register("password", { required: true })}
                      />
                      {errors?.password && (
                        <span className="text-warning">
                          This field is required
                        </span>
                      )}
                    </div>
                    <div className="d-grid gap-2 mb-3">
                      <button className="btn btn-secondary" type="submit">
                        Login
                      </button>
                    </div>
                    <div className="d-grid gap-2 mb-3">
                      <button
                        className="btn btn-outline-danger"
                        type="button"
                        onClick={() => handleLoginWithGoogle(navigate)}
                      >
                        <i className="bi bi-google me-2"></i>
                        Login with Google
                      </button>
                    </div>
                  </form>
                  <p className="card-text text-center">
                    Don't have an account? <Link to="/register">Register</Link>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Warning */}
          {authError && (
            <div className="row">
              <div className="col-md-4 col-sm-12 mx-auto mt-4">
                <LoginError authError={authError} setAuthError={setAuthError} />
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Login;
