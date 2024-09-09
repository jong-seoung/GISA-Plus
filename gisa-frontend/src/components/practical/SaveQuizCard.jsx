import React from "react";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";

const QuizCard = ({ quizItem,categoryName, onClick }) => (
  <Col md={3} onClick={() => onClick(quizItem)}>
    <Card className="mb-4">
      <Card.Img variant="top" src="holder.js/100px160" />
      <Card.Body>
        <Card.Title>{quizItem.title}</Card.Title>
        <Card.Text>{quizItem.content}</Card.Text>
      </Card.Body>
      <Card.Footer>
        <small className="text-muted">
          {categoryName} - {quizItem.unit.name}
        </small>
      </Card.Footer>
    </Card>
  </Col>
);

export default QuizCard;
