import React from "react";
import { Card, Col, Button } from "react-bootstrap";
import ProblemTitle from "../writing/ProblemNumTitle";
import ProblemAnswers from "./ProblemAnswers";
import EditButtons from "../button/EditButton";
import DeleteButtons from "../button/DeleteButton";

const ProblemCard = ({
  problemItem,
  problemIndex,
  numStyle,
  answerStates,
  handleAnswer,
  imageStates,
  isManager,
  handleEdit,
  handleDelete,
}) => (
  <Col
    md={6}
    style={{
      borderRight: problemIndex % 2 === 0 ? "1px solid #ccc" : "none",
      paddingLeft: problemIndex % 2 === 0 ? "20px" : "none",
      position: "relative",
    }}
  >
    <Card.Body>
      <div
        style={{
          zIndex: 0,
          display: "flex",
          alignItems: "center",
          position: "relative",
        }}
      >
        {/* 문제 제목 컴포넌트 */}
        <div style={{ position: "relative" }} className="w-100">
          <ProblemTitle
            problemIndex={problemIndex}
            imageStates={imageStates}
            num={problemItem.num}
            title={problemItem.title}
          />
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
        <>
          <EditButtons onEdit={() => handleEdit(problemIndex)} />
          <DeleteButtons onDelete={() => handleDelete(problemIndex)} />
        </>
      )}
    </Card.Body>
  </Col>
);

export default ProblemCard;
