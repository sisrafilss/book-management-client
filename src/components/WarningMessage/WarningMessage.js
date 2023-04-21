import React from "react";

const WarningMessage = () => {
  return (
    <div className="alert alert-warning d-flex align-items-center" role="alert">
      <i className="bi bi-exclamation-triangle-fill me-2"></i>
      <div>OPPS! Something Went Wrong! Please try again.</div>
    </div>
  );
};

export default WarningMessage;
