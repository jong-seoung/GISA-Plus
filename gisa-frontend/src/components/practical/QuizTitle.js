import React from "react";
import { Row, Col } from "react-bootstrap";

const QuizContent = ({ title }) => (
  <Row className="mt-4">
    <Col className="text-left fw-bold h4">
      <p>{title}</p>
    </Col>
  </Row>
);

export default QuizContent;
