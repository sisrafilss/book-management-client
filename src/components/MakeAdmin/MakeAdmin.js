import React, { useState } from "react";
import Header from "../Header/Header";
import { useForm } from "react-hook-form";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import SuccessMessage from "../SuccessMessage/SuccessMessage";
import WarningMessage from "../WarningMessage/WarningMessage";

const MakeAdmin = () => {
  const [success, setSuccess] = useState("");
  const [warning, setWarning] = useState("");
  const { user } = useAuth();

  const { register, handleSubmit, errors, reset } = useForm();
  const onSubmit = (data) => {
    axios
      .put(`http://localhost:5000/make-admin/${user.email}`, data)
      .then((res) => {
        console.log(res.data);
        if (res?.data?.status === 200) {
          setSuccess(res.data.message);
        } else {
          setWarning(res?.data?.message);
        }
      });

    reset();
  };

  return (
    <>
      <Header />
      <div className="container mt-5">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="row">
            <div className="col-md-6 mx-auto bg-secondary text-white p-4 rounded">
              <h2 className="h4 text-center">Make Admin</h2>
              <div className="mb-3">
                <label htmlFor="email">Email</label>
                <input
                  placeholder="Enter email address"
                  type="email"
                  className="form-control"
                  {...register("email", { required: true })}
                />
                {errors?.email && (
                  <span className="text-warning">This field is required</span>
                )}
              </div>
              <button className="btn btn-success" type="submit">
                Make Admin
              </button>
            </div>
          </div>
        </form>
        {/* Success */}
        {success && (
          <div className="row">
            <div className="col-md-4 col-sm-12 mx-auto mt-4">
              <SuccessMessage setSuccess={setSuccess} message={success} />
            </div>
          </div>
        )}
        {/* Warning */}
        {warning && (
          <div className="row">
            <div className="col-md-4 col-sm-12 mx-auto mt-4">
              <WarningMessage setWarning={setWarning} message={warning} />
            </div>
          </div>
        )}
        u
      </div>
    </>
  );
};

export default MakeAdmin;
