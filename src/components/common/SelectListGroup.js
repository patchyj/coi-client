import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";

const SelectListGroup = ({
  name,
  value,
  error,
  info,
  onChange,
  autoComplete,
  options
}) => {
  const selectOptions = options.map((option, key) => (
    <option key={key} value={option._id}>
      {option.city}
    </option>
  ));

  return (
    <div className="form-group">
      <select
        className={classnames("form-control form-control-lg", {
          "is-invalid": error
        })}
        name={name}
        onChange={onChange}
        autoComplete={autoComplete}
      >
        <option defaultValue="0">
          Please choose your nearest circle chapter
        </option>
        {selectOptions}
      </select>
      {info && <small className="form-text text-muted">{info}</small>}
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

SelectListGroup.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  info: PropTypes.string,
  options: PropTypes.array,
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  autoComplete: PropTypes.func
};

export default SelectListGroup;
