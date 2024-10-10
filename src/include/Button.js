import React from 'react';

const Button = ({ onClick, children, className = '', type = 'button' }) => {
    return (
        <button
            type={type}
            className={`btn w-100 mt-2 fw-bolder fs-6 submit-btn ${className}`}
            onClick={onClick}
        >
            {children}
        </button>
    );
};

export default Button;
