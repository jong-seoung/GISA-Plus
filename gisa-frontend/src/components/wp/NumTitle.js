import React from "react";
import { Row, Col, Card } from "react-bootstrap";

const ProblemTitle = ({ num, title }) => (
  <Row className="mb-2">
    <Col>
      <Card.Title className="fs-5 fw-bold">
        {num}. {title}
      </Card.Title>
    </Col>
  </Row>
);

export default ProblemTitle;
