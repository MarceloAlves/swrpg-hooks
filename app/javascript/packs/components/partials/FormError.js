import React from "react";
import PropTypes from "prop-types";

const FormError = ({ field, errors }) => {
  const allErrors = errors.map((error, index) => (
    <p key={index} className="form-text text-danger">
      {field} {error}
    </p>
  ));

  return <React.Fragment>{allErrors}</React.Fragment>;
};

FormError.propTypes = {
  field: PropTypes.string.isRequired,
  errors: PropTypes.array.isRequired
};

export default FormError;
