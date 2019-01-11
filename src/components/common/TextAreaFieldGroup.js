import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const TestAreaFieldGroup = ({
  name,
  placeholder,
  value,
  rows,
  cols,
  error,
  info,
  onChange,
  autoComplete,
  button
}) => {
  return (
    <div
      className={classnames('form-group ', {
        row: button
      })}
    >
      <textarea
        className={classnames('form-control ', {
          'form-control-lg': !button,
          'is-invalid': error,
          'col-10': button
        })}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        autoComplete={autoComplete}
        cols={cols}
        rows={rows}
      />
      {button}
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
