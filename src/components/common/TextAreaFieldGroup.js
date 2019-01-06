import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";

const TestAreaFieldGroup = ({
  name,
  placeholder,
  value,
  rows,
  cols,
  error,
  info,
  onChange,
  autoComplete
}) => {
  return (
    <div className="form-group">
      <textarea
        className={classnames("form-control form-control-lg", {
          "is-invalid": error
        })}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        autoComplete={autoComplete}
        cols={cols}
        rows={rows}
      />
      {info && <small className="form-text text-muted">{info}</small>}
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

TestAreaFieldGroup.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  info: PropTypes.string,
  rows: PropTypes.string,
  cols: PropTypes.string,
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  autoComplete: PropTypes.func
};

export default TestAreaFieldGroup;
