import React from "react";
import Row from "react-bootstrap/Row";
import QuizCard from "./SaveQuizCard";

const QuizList = ({ quizzes,categoryName, onQuizClick }) => (
  <Row>
    {quizzes.length === 0 && <p>저장된 퀴즈가 없습니다.</p>}
    {quizzes.map((quizItem) => (
      <QuizCard key={quizItem.id} quizItem={quizItem} categoryName={categoryName} onClick={onQuizClick} />
    ))}
  </Row>
);

export default QuizList;
