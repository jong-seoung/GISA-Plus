import React from "react";
import { Row, Col } from "react-bootstrap";

const QuizHeader = ({ categoryName, unitName, version }) => (
  <Row>
    <Col className="text-center">
      <h4>{categoryName} - {unitName}</h4>
      <small>{version}</small>
    </Col>
  </Row>
);

export default QuizHeader;