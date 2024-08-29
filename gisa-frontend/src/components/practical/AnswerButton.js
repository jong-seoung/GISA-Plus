import React from "react";
import { Button, Row } from "react-bootstrap";

const AnswerButton = ({ showAnswer, onClick }) => (
  <Row className="text-center mt-3">
    {showAnswer ? (
      <Button className="invisible">""</Button>
    ) : (
      <Button variant="success" onClick={onClick}>
        정답 보기
      </Button>
    )}
  </Row>
);

export default AnswerButton;
