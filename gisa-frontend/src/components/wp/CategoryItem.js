import React from "react";
import { ListGroup } from "react-bootstrap";

const DONE_STYLE = { textDecoration: "line-through" };

const CategoryItem = ({ category, onClick }) => (
  <ListGroup.Item className="d-flex justify-content-between align-items-start">
    <div
      style={{
        cursor: "pointer",
        ...(category.done ? DONE_STYLE : null),
      }}
      onClick={onClick}
    >
      {category.version}
    </div>
  </ListGroup.Item>
);

export default CategoryItem;
