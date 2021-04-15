import React from 'react';
import PropTypes from 'prop-types';
import './FilterSelector.scss';

const FilterSelector = (props) => {
  const { label } = props;
  const { options } = props;
  const { id } = props;
  return (
    <>
      {label && (
      <p className={id}>{label}</p>
      )}
      {options && (
      <select id={id} onChange={(e) => props.onChange(e)}>
        {options.map(
          (item) => <option key={item.key} value={item.key}>{item.value}</option>,
        )}
      </select>
      )}
    </>
  );
};

FilterSelector.propTypes = {
  label: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.object).isRequired,
  id: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default FilterSelector;
