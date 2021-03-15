import React from 'react';
import PropTypes from 'prop-types';
import "./LabelSelect.scss";


const LabelSelect = (props) => {
    return (
        <>
            {props.label && (
                <p className={props.id} >{props.label}</p>
            )}
            {props.options && (
                <select id={props.id} onChange={e => props.onChange(e)}>
                    {props.options.map((item, index) => <option key={index} value={item.key}>{item.value}</option>)}
                </select>
            )}
        </>
    )
}

LabelSelect.propTypes = {
    label: PropTypes.string.isRequired,
    options: PropTypes.array.isRequired,
    id: PropTypes.string.isRequired,
}

export default LabelSelect