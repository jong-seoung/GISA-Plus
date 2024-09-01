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
    <Card.Body style={{ position: "relative"}}>
      <div style={{  zIndex: 0, display: 'flex', alignItems: 'center', position: 'relative' }}>
        {/* 이미지 컴포넌트 */}
        <ProblemImage
          imageState={imageStates[`${problemIndex}`]}
          problemIndex={problemIndex}
        />
        {/* 문제 제목 컴포넌트 */}
        <div style={{ flex: 1, position: 'relative', zIndex: 1}}>
          <ProblemTitle num={problemItem.num} title={problemItem.title} />
        </div>
      </div>
      {/* 문제 답변 컴포넌트 */}
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
