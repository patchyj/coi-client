import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const SelectListGroup = ({
  name,
  placeholder,
  value,
  error,
  icon,
  type,
  onChange,
  autoComplete
}) => {
  return (
    <div className="input-group mb-3">
      <div className="input-group-prepend">
        <span className="input-group-text">
          <i className={ icon }></i>
        </span>
      </div>
      <input
        className={ classnames('form-control form-control-lg', {
          'is-invalid': error
        })}
        placeholder={ placeholder }
        name={ name }
        value={ value }
        onChange={ onChange }
        autoComplete={ autoComplete }
      />
      { error && (<div className="invalid-feedback">{ error }</div>)}
    </div>
  )
};

SelectListGroup.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  icon: PropTypes.string,
  type: PropTypes.string.isRequired,
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  autoComplete: PropTypes.func,
  options: PropTypes.array.isRequired
}

SelectListGroup.defaultProps = {
  type: 'text'
}

export default SelectListGroup;
