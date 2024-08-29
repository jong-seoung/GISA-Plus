import React from "react";
import { Card } from "react-bootstrap";

const CategoryHeader = ({ title }) => (
  <Card.Header className="d-flex justify-content-between align-items-center">
    <div>
      <h4 className="mt-2">{title}</h4>
    </div>
  </Card.Header>
);

export default CategoryHeader;
