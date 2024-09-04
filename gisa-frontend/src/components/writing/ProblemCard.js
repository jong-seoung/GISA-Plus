import React from "react";
import { Card, Col, Button } from "react-bootstrap";
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
  isManager,
}) => (
  <Col
    md={6}
    style={{
      borderRight: problemIndex % 2 === 0 ? "1px solid #ccc" : "none",
      position: "relative",
    }}
  >
    <Card.Body style={{ position: "relative" }}>
      <div
        style={{
          zIndex: 0,
          display: "flex",
          alignItems: "center",
          position: "relative",
        }}
      >
        {/* 이미지 컴포넌트 */}
        <ProblemImage
          imageState={imageStates[`${problemIndex}`]}
          problemIndex={problemIndex}
        />
        {/* 문제 제목 컴포넌트 */}
        <div style={{ flex: 1, position: "relative", zIndex: 1 }}>
          <ProblemTitle num={problemItem.num} title={problemItem.title} />
        </div>
      </div>
      {/* 이미지 컨테이너 */}
      <div className="mt-2 mb-2">
        <div className="w-100">
          {problemItem.image_list &&
            problemItem.image_list.map((imageItem, index) => (
              <img
                key={index} 
                src={imageItem.image}
                alt={`이미지 ${index}`} 
                style={{
                  width: "100%",
                  height: "auto",
                }}
              />
            ))}
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
      {isManager && (
        <div>
          <Button
            variant="outline-secondary"
            size="sm"
            className="me-2"
            onClick={() => problemIndex}
          >
            수정
          </Button>
          <Button
            variant="outline-danger"
            size="sm"
            onClick={() => problemIndex}
          >
            삭제
          </Button>
        </div>
      )}
    </Card.Body>
  </Col>
);

export default ProblemCard;
