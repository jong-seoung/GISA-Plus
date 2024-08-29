import React from "react";
import { Row } from "react-bootstrap";
import MemoInput from "./MemoInput";
import AnswerButton from "./AnswerButton";

const RestoreAnswer = ({ answerItem, showAnswer, handleShowAnswer, index, idx }) => (
  <Row className="fw-bold h5 mb-1">
    <div>{answerItem.content}</div>
    <ol className="p-3 ms-4 fw-normal">
      <li>
        <small>{showAnswer ? answerItem.name : ""}</small>
      </li>
    </ol>

    <MemoInput />
    
    <AnswerButton showAnswer={showAnswer} onClick={() => handleShowAnswer(index, idx)} />
  </Row>
);

export default RestoreAnswer;
