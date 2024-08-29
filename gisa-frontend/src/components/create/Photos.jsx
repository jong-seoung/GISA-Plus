import React from 'react';

const Photos = ({ onPhotoChange }) => {
    return (
        <div>
            <label>Photos:</label>
            <input type="file" multiple onChange={onPhotoChange} />
        </div>
    );
};

export default Photos;
