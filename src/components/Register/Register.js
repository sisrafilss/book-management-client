import React from "react";
import Header from "../Header/Header";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useForm } from "react-hook-form";
import LoginError from "../LoginError/LoginError";

const Register = () => {
  const navigate = useNavigate();
  const { loginWithGoogle, registration, setLoading, authError, setAuthError } =
    useAuth();

  // handle login with google
  const handleLoginWithGoogle = (navigate) => {
    setLoading(true);
    loginWithGoogle(navigate);
  };

  // handle registration
  const handleRegistration = (data, navigate) => {
    setLoading(true);
    registration(data?.name, data?.email, data?.password, navigate);
  };

  // React Hook Form
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = (data) => handleRegistration(data, navigate);

  return (
    <>
      <Header />
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title text-center mb-4">Registration</h5>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="mb-3">
                    <label for="fullname" className="form-label">
                      Full Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="fullname"
                      name="fullname"
                      placeholder="Your Full Name"
                      required
                      {...register("name", { required: true })}
                    />
                    {errors?.name && (
                      <span className="text-warning">
                        This field is required
                      </span>
                    )}
                  </div>
                  <div className="mb-3">
                    <label for="email" className="form-label">
                      Email address
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      name="email"
                      aria-describedby="emailHelp"
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
                    <label for="password" className="form-label">
                      Password
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      name="password"
                      required
                      {...register("password", { required: true })}
                    />
                    {errors?.password && (
                      <span className="text-warning">
                        This field is required
                      </span>
                    )}
                  </div>
                  <div className="d-grid gap-2">
                    <button type="submit" className="btn btn-secondary">
                      Register
                    </button>
                    <button
                      onClick={() => handleLoginWithGoogle(navigate)}
                      type="button"
                      className="btn btn-outline-danger"
                    >
                      <i className="bi bi-google"></i> Login with Google
                    </button>
                  </div>
                </form>
                <p className="mt-3 text-center">
                  Already Registered? <Link to="/login">Login</Link>
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
    </>
  );
};

export default Register;
