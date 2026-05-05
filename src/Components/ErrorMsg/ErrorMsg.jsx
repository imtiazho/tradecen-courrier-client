import React from 'react';

const ErrorMsg = ({ name }) => {
    return (
        <div>
            <span className="text-red-500 text-xs mt-1">{name}</span>
        </div>
    );
};

export default ErrorMsg;