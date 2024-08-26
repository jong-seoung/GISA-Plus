import React, { useState, useEffect } from "react";
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
  const { categoryName } = useParams(); // URL 경로에서 categoryName을 가져옴
  const [quiz, setQuiz] = useState([]);
  const [showAnswers, setShowAnswers] = useState(false); // 정답 표시 여부를 관리하는 상태
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const sampleQuiz = [
      {
        question: "오늘의 첫 번째 퀴즈는?",
        answers: ["정답1", "정답2", "정답3"],
        correctAnswer: "정답1",
      },
    ];

    setQuiz(sampleQuiz);
    setLoading(false);
  }, []);

  const handleShowAnswers = () => {
    setShowAnswers(true); // 버튼 클릭 시 정답 표시 상태를 true로 변경
  };

  if (loading) {
    return <p>로딩 중...</p>;
  }

  return (
    <Container className="mt-4">
      <Row className="justify-content-center">
        <Col md={12} className="p-0">
          <Card className="mb-4">
            <Card.Body>
              <Row className="align-items-center">
                {/* 이전 버튼 */}
                <Col xs={1}>
                  <Button className={styles.Background} variant="link">
                    <i className={styles.arrow} role="img"></i>
                  </Button>
                </Col>

                {/* 퀴즈 내용 */}
                <Col xs={10}>
                  <Row>
                    {/* 제목 및 날짜 섹션 */}
                    <Col className="text-center">
                      <h3>{categoryName} - 단원 </h3>
                      <p> version </p>
                    </Col>
                  </Row>

                  <Row className="mt-4">
                    {/* 문제 섹션 */}
                    <Col className="text-left fw-bold h4">
                      <p>{quiz[0].question}</p>
                    </Col>

                    {/* 이미지 섹션 */}
                    <Row className="text-center">
                      <img
                        src={quiz[0].image}
                        alt="이미지"
                        style={{ width: "100%", height: "auto" }}
                      />
                    </Row>

                    {/* 보기 섹션 */}
                    <Row className="fw-bold h5">
                      <ol>
                        <li>ㄱ: {showAnswers ? quiz[0].answers[0] : " "}</li>{" "}
                        <li>ㄴ: {showAnswers ? quiz[0].answers[1] : " "}</li>
                        <li>ㄷ: {showAnswers ? quiz[0].answers[2] : " "}</li>
                      </ol>
                    </Row>

                    {/* 연습장 섹션 */}
                    <Row className="mt-4 mb-2">
                      <InputGroup>
                        <InputGroup.Text>메모</InputGroup.Text>
                        <Form.Control
                          as="textarea"
                          aria-label="With textarea"
                        />
                      </InputGroup>
                    </Row>

                    {/* 보기 버튼 섹션 */}
                    <Row className="text-center mt-3">
                      {showAnswers ? (
                        <Button variant="success" onClick={handleShowAnswers}>
                         저장
                        </Button>
                      ) : (
                        <Button variant="primary" onClick={handleShowAnswers}>
                          정답 보기
                        </Button>
                      )}
                    </Row>
                  </Row>
                </Col>

                {/* 다음 버튼 */}
                <Col xs={1}>
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
