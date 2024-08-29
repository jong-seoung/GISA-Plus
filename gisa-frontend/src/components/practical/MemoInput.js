import React from "react";
import { Row, InputGroup, Form } from "react-bootstrap";

const MemoInput = () => (
  <Row className="mb-2">
    <InputGroup>
      <InputGroup.Text>메모</InputGroup.Text>
      <Form.Control as="textarea" aria-label="메모 영역" />
    </InputGroup>
  </Row>
);

export default MemoInput;
