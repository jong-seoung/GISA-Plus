import React from 'react';

const NumInput = ({ num, onInputChange }) => {
    return (
        <div>
            <label>Num:</label>
            <input
                type="number"
                name="num"
                value={num}
                onChange={onInputChange}
                required
            />
        </div>
    );
};

export default NumInput;
