import React from "react";
import { Card, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const SectionCard = ({ title, text, link, buttonText, variant }) => (
  <Card className="mb-4">
    <Card.Body>
      <Card.Title>{title}</Card.Title>
      <Card.Text>{text}</Card.Text>
      <NavLink to={link}>
        <Button variant={variant}>{buttonText}</Button>
      </NavLink>
    </Card.Body>
  </Card>
);

export default SectionCard;
