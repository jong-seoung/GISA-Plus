import React from "react";
import { Row } from "react-bootstrap";

const QuizImage = ({ imageUrl }) => (
  <Row className="text-center">
    {imageUrl ? (
      <img
        src={imageUrl}
        alt="퀴즈 이미지"
        style={{ width: "90%", height: "auto" }}
        className="mx-auto d-block"
      />
    ) : (
      <p></p>
    )}
  </Row>
);

export default QuizImage;
