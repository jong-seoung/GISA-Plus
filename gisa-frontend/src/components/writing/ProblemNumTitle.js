import React from "react";
import { Row, Col, Card } from "react-bootstrap";
import ProblemImage from "./ProblemImage";

const ProblemTitle = ({ num, title, problemIndex, imageStates }) => (
  <Row className="mb-2">
    <Col>
      <Card.Title className="fs-5 fw-bold">
        {/* 이미지 컴포넌트 */}
        <ProblemImage
          imageState={imageStates[`${problemIndex}`]}
          problemIndex={problemIndex}
        />
        {num}. {title}
      </Card.Title>
    </Col>
  </Row>
);

export default ProblemTitle;