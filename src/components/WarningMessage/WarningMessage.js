import React, { useEffect } from "react";

const WarningMessage = ({ setWarning, message }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      setWarning(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, [setWarning]);

  return (
    <div className="alert alert-warning d-flex align-items-center" role="alert">
      <i className="bi bi-exclamation-triangle-fill me-2"></i>
      <div>{message}</div>
    </div>
  );
};

export default WarningMessage;
