import React from "react";

const FormError = ({ field, errors }) => {
  errors = errors.map((error, index) => {
    return (
      <p key={index} className="form-text text-danger">
        {field} {error}
      </p>
    );
  });

  return <React.Fragment>{errors}</React.Fragment>;
};

export default FormError;
