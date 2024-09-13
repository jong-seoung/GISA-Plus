import React from "react";
import { Row } from "react-bootstrap";
import MemoInput from "./MemoInput";
import AnswerButton from "./AnswerButton";

const RestoreAnswer = ({
  restoreItem,
  showAnswer,
  handleShowAnswer,
  index,
}) => (
  <Row className="fw-bold h5 mb-1">
    <ol className="p-3 ms-4 fw-normal fs-4">
      {restoreItem.answer.map((answer, index) => (
        <li key={index}>
          <small>{showAnswer ? answer.name : ""}</small>
        </li>
      ))}
    </ol>

    <MemoInput />

    <AnswerButton
      showAnswer={showAnswer}
      onClick={() => handleShowAnswer(index)}
    />
  </Row>
);

export default RestoreAnswer;
