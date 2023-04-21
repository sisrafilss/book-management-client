import React, { useEffect } from "react";

const SuccessMessage = ({ setSuccess, message }) => {
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setSuccess(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, [setSuccess]);

  return (
    <div className="alert alert-success d-flex align-items-center" role="alert">
      <i className="bi bi-check-circle-fill me-2"></i>
      <div>{message}</div>
    </div>
  );
};

export default SuccessMessage;
