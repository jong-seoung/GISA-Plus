import React from "react";
import { Button } from "react-bootstrap";

const DeleteButtons = ({ onDelete }) => {
  return (
      <Button
        variant="outline-danger"
        size="sm"
        onClick={onDelete}
      >
        삭제
      </Button>
  );
};

export default DeleteButtons;
