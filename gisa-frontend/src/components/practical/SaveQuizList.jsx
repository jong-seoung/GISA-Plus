import React from "react";
import Row from "react-bootstrap/Row";
import QuizCard from "./SaveQuizCard";

const QuizList = ({ quizzes, onQuizClick }) => (
  <Row>
    {quizzes.length === 0 && <p>저장된 퀴즈가 없습니다.</p>}
    {quizzes.map((quizItem) => (
      <QuizCard key={quizItem.id} quizItem={quizItem} onClick={onQuizClick} />
    ))}
  </Row>
);

export default QuizList;
