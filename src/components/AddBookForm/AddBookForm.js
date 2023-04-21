import React, { useState } from "react";
import "./AddBookForm.css";
import { useForm } from "react-hook-form";
import SuccessMessage from "../SuccessMessage/SuccessMessage";
import WarningMessage from "../WarningMessage/WarningMessage";

const AddBookForm = () => {
  const [success, setSuccess] = useState(false);
  const [warning, setWarning] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    reset();
  };

  return (
    <>
      <div className="container mt-4">
        <div className="row">
          <div className="col-md-4 col-sm-12 mx-auto bg-secondary text-light pt-4 ps-4 pe-4 pb-2 rounded ">
            <form onSubmit={handleSubmit(onSubmit)}>
              <h4 className="mb-3">Enter Book Info</h4>
              <div className="mb-3">
                <label htmlFor="title">Book Title</label>
                <input
                  className="form-control"
                  placeholder="Book Title"
                  type="text"
                  {...register("bookTitle", { required: true })}
                />
                {errors.author && (
                  <span className="text-warning">This field is required</span>
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="author">Book Author</label>
                <input
                  className="form-control"
                  placeholder="Book Author"
                  type="text"
                  {...register("author", { required: true })}
                />
                {errors.author && (
                  <span className="text-warning">This field is required</span>
                )}
              </div>
              <div className="mb-3">
                <input
                  className="btn btn-primary "
                  type="submit"
                  value="Add Book"
                />
              </div>
            </form>
          </div>
        </div>

        {/* Success */}
        {success && (
          <div className="row">
            <div className="col-md-4 col-sm-12 mx-auto mt-4">
              <SuccessMessage />
            </div>
          </div>
        )}

        {/* Warning */}
        {warning && (
          <div className="row">
            <div className="col-md-4 col-sm-12 mx-auto mt-4">
              <WarningMessage />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default AddBookForm;
