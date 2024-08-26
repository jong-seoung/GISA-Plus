import React, { useState, useEffect } from "react";
import { useApiAxios } from "../api";
import { useParams } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Button,
  Card,
  InputGroup,
  Form,
} from "react-bootstrap";
import styles from "./DailyQuiz.module.css"; // 모듈 CSS 임포트

function DailyQuiz() {
  const [{ data: origQuiz = undefined, loading }, refetch] =
    useApiAxios(`/quiz/api/post/0`);
  const [quiz, setQuiz] = useState([]);
  const { categoryName } = useParams();
  const [showAnswers, setShowAnswers] = useState(false);

  useEffect(() => {
    setShowAnswers(false);
    setQuiz(origQuiz || []);
  }, [origQuiz]);

  const handleShowAnswers = () => {
    setShowAnswers(true);
  };

  const handleNextPage = () => {
    refetch({
      url: `/quiz/api/post/${quiz.id}`,
      method: "GET",
    });
  };
  console.log(quiz);
  if (loading || !quiz || !quiz.unit || !quiz.unit.category) {
    return <p></p>;
  }

  return (
    <Container className="mt-4">
      <Row className="justify-content-center">
        <Col md={12} className="p-0">
          <Card className="mb-4">
            <Card.Body>
              <Row className="align-items-center">
                {/* 왼쪽 여백 */}
                <Col xs={1} />

                {/* 퀴즈 내용 */}
                <Col xs={10}>
                  <Row>
                    <Col className="text-center">
                      <h4>
                        {categoryName}, {quiz.unit.name}
                      </h4>
                      <small>{quiz.unit.category.version}</small>
                    </Col>
                  </Row>

                  <Row className="mt-4">
                    <Col className="text-left fw-bold h4">
                      <p>{quiz.title}</p>
                    </Col>

                    <Row className="text-center">
                      {quiz.image_list && quiz.image_list.length > 0 ? (
                        <img
                          src={quiz.image_list[0].image} // 템플릿 리터럴로 이미지 URL 처리
                          alt="퀴즈 이미지"
                          style={{ width: "90%", height: "auto" }}
                          className="mx-auto d-block"
                        />
                      ) : (
                        <p></p>
                      )}
                    </Row>

                    <Row className="fw-bold h5 mb-1">
                      <p className={`${quiz.image_list[0] ? "ms-5" : "ms-2"}`}>
                        {quiz.content}
                      </p>

                      <ol className="p-3 ms-4 fw-normal">
                        {quiz.answer.map((item, index) => (
                          <li key={index}>
                            <small>{showAnswers ? item.name : ""}</small>
                          </li>
                        ))}
                      </ol>
                    </Row>

                    <Row className="mb-2">
                      <InputGroup>
                        <InputGroup.Text>메모</InputGroup.Text>
                        <Form.Control as="textarea" aria-label="메모 영역" />
                      </InputGroup>
                    </Row>

                    <Row className="text-center mt-3">
                      <Button
                        variant={showAnswers ? "success" : "primary"}
                        onClick={handleShowAnswers}
                      >
                        {showAnswers ? "저장" : "정답 보기"}
                      </Button>
                    </Row>
                  </Row>
                </Col>

                {/* 다음 버튼 */}
                <Col xs={1} onClick={handleNextPage}>
                  <Button className={styles.noBackground} variant="link">
                    <i
                      className={`${styles.arrow} ${styles.left}`}
                      role="img"
                    ></i>
                  </Button>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default DailyQuiz;
