import React from "react";
import { Row, Col } from "react-bootstrap";

const QuizContent = ({ title, content, imageExists }) => (
  <Row className="mt-4">
    <Col className="text-left fw-bold h4">
      <p>{title}</p>
    </Col>

    <Row className="fw-bold h5 mb-1">
      <p className={`${imageExists ? "ms-5" : "ms-2"}`}>{content}</p>
    </Row>
  </Row>
);

export default QuizContent;
