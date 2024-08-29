import React from "react";
import { Row, Button } from "react-bootstrap";
import MemoInput from "./MemoInput";
import AnswerButton from "./AnswerButton";

const QuizAnswers = ({
  answers,
  showAnswers,
  quiz,
  handleShowAnswers,
  handleSave,
  handleCancelSave,
}) => (
  <>
    <Row className="fw-bold h5 mb-1">
      <ol className="p-3 ms-4 fw-normal">
        {answers.map((item, index) => (
          <li key={index}>
            <small>{showAnswers ? item.name : ""}</small>
          </li>
        ))}
      </ol>
    </Row>

    <MemoInput />

    <Row className="text-center mt-3">
      {showAnswers ? (
        quiz.is_saved ? (
          <Button variant="danger" onClick={() => handleCancelSave({ quiz })}>
            저장 취소
          </Button>
        ) : (
          <Button variant="primary" onClick={() => handleSave({ quiz })}>
            저장
          </Button>
        )
      ) : (
        <AnswerButton showAnswer={showAnswers} onClick={handleShowAnswers} />
      )}
    </Row>
  </>
);

export default QuizAnswers;
