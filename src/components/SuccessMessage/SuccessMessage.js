import React from "react";

const SuccessMessage = () => {
  return (
    <div className="alert alert-success d-flex align-items-center" role="alert">
      <i className="bi bi-check-circle-fill me-2"></i>
      <div>Book Information Added Successfuly! </div>
    </div>
  );
};

export default SuccessMessage;
