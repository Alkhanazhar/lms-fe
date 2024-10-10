import React from 'react';

const RadioFilter = ({ options, name, onChange, title }) => {
    return (
        <div className="filter-group mb-4  ">
            <h5 className='fw-bolder'>{title}</h5>
            <div className='d-flex gap-md-3 gap-2'>
                {options.map((option) => (
                    <div className="form-check mt-1" key={option.id} >
                        <input
                            className="form-check-input square-radio"
                            type="checkbox"
                            name={name}
                            id={option.id}
                            value={option.value}
                            onChange={onChange}
                        />
                        <label className="form-check-label" htmlFor={option.id}>
                            {option.label}
                        </label>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RadioFilter;
