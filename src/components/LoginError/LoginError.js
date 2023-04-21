import React, { useEffect } from "react";

const LoginError = ({ authError, setAuthError }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      setAuthError("");
    }, 3000);
    return () => clearTimeout(timer);
  }, [setAuthError]);

  return (
    <div className="alert alert-warning d-flex align-items-center" role="alert">
      <i className="bi bi-exclamation-triangle-fill me-2"></i>
      <div>{authError}</div>
    </div>
  );
};

export default LoginError;
