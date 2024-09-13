import React, { useEffect, useState } from "react";
import { useApiAxios, makeRestApi } from "../../api";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import QuizHeader from "../../components/practical/QuizHeader";
import QuizImage from "../../components/practical/Image";
import QuizTitle from "../../components/practical/QuizTitle";
import QuizContent from "../../components/practical/RestoreContent";
import QuizAnswers from "../../components/practical/Answers";
import NextButton from "../../components/practical/NextButton";
import { useStatusContext } from "../../contexts/StatusContext";

const SAVE_REST_API = makeRestApi("quiz/api/save/");

function DailyQuiz() {
  const navigate = useNavigate();
  const { categoryName } = useParams();
  const [{ data: origQuiz = undefined, loading }, refetch] = useApiAxios(
    `quiz/api/quiz/list/?categoryName=${categoryName}`
  );

  const [quiz, setQuiz] = useState([]);
  const [showAnswers, setShowAnswers] = useState(false);
  const { managed = [undefined] } = useStatusContext();

  const isManager = managed.includes(categoryName);


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
    }
  };

  const handleCancelSave = async ({ quiz }) => {
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
      url: `quiz/api/quiz/list/?categoryName=${categoryName}&exclude_id=${quiz.id}`,
      method: "GET",
    });
  };

  const pageChange = () => {
    navigate(`/${categoryName}/quiz/manager`);
  };

  if (loading || !quiz || !quiz.unit || !quiz) {
    return <p></p>;
  }

  return (
    <Container className="mt-4">
      <Row className="justify-content-center">
        <Col md={12} className="p-0">
          <Card className="mb-4">
            <Card.Body>
              <Row className="align-items-center">
                <Col xs={1} />
                <Col xs={10}>
                  <QuizHeader
                    categoryName={categoryName}
                    unitName={quiz.unit.name}
                    version={quiz.unit.category.version}
                  />

                  <QuizTitle title={quiz.title} />
                  {isManager && (
                    <div className="mb-3">
                      <Button
                        variant="outline-success"
                        size="sm"
                        className="me-2"
                        onClick={() => pageChange()}
                      >
                        관리 페이지
                      </Button>
                    </div>
                  )}

                  <QuizImage restoreItem={quiz} />

                  <QuizContent content={quiz.content} />

                  <QuizAnswers
                    answers={quiz.answer}
                    showAnswers={showAnswers}
                    quiz={quiz}
                    handleShowAnswers={handleShowAnswers}
                    handleSave={handleSave}
                    handleCancelSave={handleCancelSave}
                  />
                </Col>
                <NextButton
                  nextQuizUrl={quiz.id}
                  handleNextPage={handleNextPage}
                />
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default DailyQuiz;
