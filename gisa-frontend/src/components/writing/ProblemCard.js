import React from "react";
import { Card, Col } from "react-bootstrap";
import ProblemTitle from "../wp/NumTitle";
import ProblemAnswers from "./ProblemAnswers";
import ProblemImage from "./ProblemImage";

const ProblemCard = ({
  problemItem,
  problemIndex,
  numStyle,
  answerStates,
  handleAnswer,
  imageStates,
}) => (
  <Col
    md={6}
    style={{
      borderRight: problemIndex % 2 === 0 ? "1px solid #ccc" : "none",
      position: "relative",
    }}
  >
    <ProblemImage
      imageState={imageStates[`${problemIndex}`]}
      problemIndex={problemIndex}
    />
    <Card.Body style={{ position: "relative", zIndex: 0 }}>
      <ProblemTitle num={problemItem.num} title={problemItem.title} />
      <ProblemAnswers
        answers={problemItem.answer}
        numStyle={numStyle}
        problemIndex={problemIndex}
        answerStates={answerStates}
        handleAnswer={handleAnswer}
        imageStates={imageStates}
      />
      <div>
        <Col>
          <small className="text-end d-block">
            정답률: {problemItem.correct_rate || 0}%
          </small>
        </Col>
      </div>
    </Card.Body>
  </Col>
);

export default ProblemCard;
