import React, { useEffect, useState } from "react";
import { useApiAxios, makeRestApi } from "../../api";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Card } from "react-bootstrap";
import QuizHeader from "../../components/practical/QuizHeader";
import QuizImage from "../../components/practical/Image";
import QuizContent from "../../components/practical/RestoreContent";
import QuizAnswers from "../../components/practical/Answers";
import NextButton from "../../components/practical/NextButton";
import PrevButton from "../../components/practical/PrevButton";

const SAVE_REST_API = makeRestApi("quiz/api/save/");

function DailyQuiz() {
  const { quizId, categoryName } = useParams();
  const [{ data: origQuiz = undefined, loading }, refetch] = useApiAxios(
    `quiz/api/save/${quizId}`
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
    const { data } = await SAVE_REST_API.create({ id: quiz.id });
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
      url: `quiz/api${quiz.next_quiz_url}`,
      method: "GET",
    });
  };

  const handlePrePage = () => {
    refetch({
      url: `quiz/api${quiz.prev_quiz_url}`,
      method: "GET",
    });
  };

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
                <PrevButton
                  prevQuizUrl={quiz.prev_quiz_url}
                  handlePrevPage={handlePrePage}
                />
                <Col xs={10}>
                  <QuizHeader
                    categoryName={categoryName}
                    unitName={quiz.unit.name}
                    version={quiz.unit.category.version}
                  />
                  <Row className="mt-4">
                    <Col className="text-left fw-bold h4">
                      <p>{quiz.title}</p>
                    </Col>
                  </Row>

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
                  nextQuizUrl={quiz.next_quiz_url}
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
