import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import React, { useState, useEffect } from "react";
import { useApiAxios } from "../../api";
import { useParams, useNavigate } from "react-router-dom";


function GroupExample() {
  const { categoryName } = useParams();
  const [{ data: origSaveQuiz = undefined, loading }, refetch] =
    useApiAxios(`quiz/api/save/`);
  const [quiz, setQuiz] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setQuiz(origSaveQuiz || []);
  }, [origSaveQuiz]);

  const handleClick = ({quizItem}) => {
    navigate(`${quizItem.id}/`);
  };

  console.log(quiz);
  return (
    <Row>
      {quiz.map((quizItem) => (
        <Col md={3} key={quizItem.id} onClick={() => handleClick({quizItem})}> {/* 3개씩 한 줄에 표시 */}
          <Card className="mb-4">
            <Card.Img variant="top" src="holder.js/100px160" />
            <Card.Body>
              <Card.Title>{quizItem.title}</Card.Title>
              <Card.Text>{quizItem.content}</Card.Text>
            </Card.Body>
            <Card.Footer>
              <small className="text-muted">{quizItem.unit.category.name} - {quizItem.unit.name}</small>
            </Card.Footer>
          </Card>
        </Col>
      ))}
    </Row>
  );
}

export default GroupExample;
