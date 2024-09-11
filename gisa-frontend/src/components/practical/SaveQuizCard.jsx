import React from "react";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import './SaveQuizCard.css'; // 스타일을 위한 CSS 파일

const QuizCard = ({ quizItem, categoryName, onClick }) => (
  <Col md={3} onClick={() => onClick(quizItem)}>
    <Card className="mb-4 quiz-card">
      <Card.Body>
        <Card.Title className="quiz-title">{quizItem.title}</Card.Title>
        <Card.Text className="quiz-content">{quizItem.content}</Card.Text>
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
