import React from "react";

const ProblemAnswers = ({
  answers,
  numStyle,
  problemIndex,
  answerStates,
  handleAnswer,
  imageStates,
}) => (
  <div>
    {answers.map((answerItem, answerIndex) => {
      const state = answerStates[`${problemIndex}-${answerIndex}`];
      const isCorrect = state === "correct";
      const isWrong = state === "wrong";
      return (
        <div
          key={answerIndex}
          onClick={
            imageStates[`${problemIndex}`] === undefined ||
            Object.keys(imageStates[`${problemIndex}`]).length === 0
              ? () => handleAnswer(problemIndex, answerIndex, answerItem)
              : undefined
          }
          style={{
            color: isWrong ? "red" : isCorrect ? "green" : "inherit",
            textDecoration: isWrong || isCorrect ? "underline" : "none",
          }}
        >
          <p className="fw-normal fs-6">
            {numStyle[answerIndex]} {answerItem.name}
          </p>
        </div>
      );
    })}
  </div>
);

export default ProblemAnswers;
