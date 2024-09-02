import React from "react";
import { ListGroup, Button } from "react-bootstrap";

const DONE_STYLE = { textDecoration: "line-through" };

const CategoryItem = ({ index, category, onClick, isManager, deleteVersion, editVersion }) => (
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

    {isManager && (
      <div>
        <Button
          variant="outline-secondary"
          size="sm"
          className="me-2"
          onClick={() => editVersion( index )}
        >
          수정
        </Button>
        <Button
          variant="outline-danger"
          size="sm"
          onClick={() => deleteVersion( index )}
        >
          삭제
        </Button>
      </div>
    )}
  </ListGroup.Item>
);

export default CategoryItem;
