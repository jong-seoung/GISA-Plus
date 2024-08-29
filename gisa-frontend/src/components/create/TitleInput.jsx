import React from 'react';

const TitleInput = ({ title, onInputChange }) => {
    return (
        <div>
            <label>Title:</label>
            <input
                type="text"
                name="title"
                value={title}
                onChange={onInputChange}
                required
            />
        </div>
    );
};

export default TitleInput;
