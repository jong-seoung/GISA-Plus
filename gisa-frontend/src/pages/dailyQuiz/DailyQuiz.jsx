import { useState, useEffect } from "react";
import { useApiAxios, makeRestApi } from "../../api";
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

const SAVE_REST_API = makeRestApi("quiz/api/save/");

function DailyQuiz() {
  const { categoryName } = useParams();
  const [{ data: origQuiz = undefined, loading }, refetch] = useApiAxios(
    `quiz/api/post/0?categoryName=${categoryName}`
  );
  const [quiz, setQuiz] = useState([]);
  const [showAnswers, setShowAnswers] = useState(false);

  useEffect(() => {
    setShowAnswers(false);
    setQuiz(origQuiz || []);
  }, [origQuiz]);

  const handleShowAnswers = () => {
    setShowAnswers(true);
  };

  const handleSave = async ({ quiz }) => {
    const { data, error } = await SAVE_REST_API.create({ id: quiz.id });
    if (data) {
      setQuiz(prev => ({
        ...prev,
        is_saved: data.is_saved,
      }));
      console.log(data);
    }
  };

  const handleCancleSave = async ({ quiz }) => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      const { data, response } = await SAVE_REST_API.delete(quiz.id);
      if (response?.status === 204) {
        setQuiz(prev => ({
          ...prev,
          is_saved: data.is_saved,
        }));
      }
    }
  };

  const handleNextPage = () => {
    refetch({
      url: `quiz/api/post/${quiz.id}?categoryName=${categoryName}`,
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

                    <Row key={quiz.id} className="text-center mt-3">
                      {showAnswers ? (
                        quiz.is_saved ? (
                          <Button
                            variant="danger"
                            onClick={() => handleCancleSave({ quiz })} // 함수 호출을 방지하고 이벤트 발생 시에만 실행
                          >
                            저장 취소
                          </Button>
                        ) : (
                          <Button
                            variant="primary"
                            onClick={() => handleSave({ quiz })} // 함수 호출을 방지하고 이벤트 발생 시에만 실행
                          >
                            저장
                          </Button>
                        )
                      ) : (
                        <Button variant="success" onClick={handleShowAnswers}>
                          정답 보기
                        </Button>
                      )}
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
