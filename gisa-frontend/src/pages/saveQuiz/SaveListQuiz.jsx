import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import React, { useState, useEffect } from "react";
import { makeRestApi, useApiAxios } from "../../api";
import { useNavigate } from "react-router-dom";

const SAVELIST_REST_API = makeRestApi("quiz/api/save");

function SaveQuizList() {
  const [
    { data: origSaveQuiz = undefined, loading, error },
    refetch,
  ] = useApiAxios("quiz/api/save");

  const [quiz, setQuiz] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await SAVELIST_REST_API.list();
        if (data) {
          setQuiz((prev) => [...data]); 
        }
      } catch (error) {
        console.error("데이터 가져오기 실패:", error);
      }
    };

    fetchData();
  }, []); 

  const navigate = useNavigate();

  const handleClick = ({ quizItem }) => {
    navigate(`${quizItem.id}`);
  };

  return (
    <Row>
      {!loading && quiz.length === 0 && <p>저장된 퀴즈가 없습니다.</p>}
      {quiz.map(quizItem => (
        <Col md={3} key={quizItem.id} onClick={() => handleClick({ quizItem })}>
          {/* 3개씩 한 줄에 표시 */}
          <Card className="mb-4">
            <Card.Img variant="top" src="holder.js/100px160" />
            <Card.Body>
              <Card.Title>{quizItem.title}</Card.Title>
              <Card.Text>{quizItem.content}</Card.Text>
            </Card.Body>
            <Card.Footer>
              <small className="text-muted">
                {quizItem.unit.category.name} - {quizItem.unit.name}
              </small>
            </Card.Footer>
          </Card>
        </Col>
      ))}
    </Row>
  );
}

export default SaveQuizList;
