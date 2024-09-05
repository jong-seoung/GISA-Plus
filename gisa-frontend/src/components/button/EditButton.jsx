import React from "react";
import { Button } from "react-bootstrap";

const EditButtons = ({ onEdit }) => {
  return (
      <Button
        variant="outline-secondary"
        size="sm"
        className="me-2"
        onClick={onEdit}
      >
        수정
      </Button>
  );
};

export default EditButtons;
