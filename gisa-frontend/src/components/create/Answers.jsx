import React from 'react';

const Answers = ({ answers, onAnswerChange, onAddAnswer }) => {
    return (
        <div>
            <label>Answers:</label>
            {answers.map((answer, index) => (
                <div key={index}>
                    <input
                        type="text"
                        value={answer.name}
                        onChange={(e) => onAnswerChange(index, e)}
                        required
                    />
                </div>
            ))}
            <button type="button" onClick={onAddAnswer}>
                Add Answer
            </button>
        </div>
    );
};

export default Answers;
