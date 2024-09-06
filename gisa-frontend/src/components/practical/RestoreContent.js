import React from "react";
import { Row } from "react-bootstrap";

const RestoreAnswer = ({ content }) => (
  <Row className="mt-3 p-3" style={{ whiteSpace: "pre-wrap" }}>
    {content && content.length > 0 ? (
      <div className="border rounded p-3 fs-5">{content}</div>
    ) : (
      <></>
    )}
  </Row>
);

export default RestoreAnswer;
