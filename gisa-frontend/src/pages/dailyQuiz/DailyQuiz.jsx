import React, { useEffect, useState } from "react";
import { useApiAxios, makeRestApi } from "../../api";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Card } from "react-bootstrap";
import QuizHeader from "../../components/practical/QuizHeader";
import QuizImage from "../../components/practical/Image";
import QuizContent from "../../components/practical/QuizContent";
import QuizAnswers from "../../components/practical/Answers";
import NextButton from "../../components/practical/NextButton";

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
      url: `quiz/api/post/${quiz.id}?categoryName=${categoryName}`,
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
                <Col xs={1} />
                <Col xs={10}>
                  <QuizHeader
                    categoryName={categoryName}
                    unitName={quiz.unit.name}
                    version={quiz.unit.category.version}
                  />

                  <QuizContent
                    title={quiz.title}
                    content={quiz.content}
                    imageExists={quiz.image_list && quiz.image_list.length > 0}
                  />

                  <QuizImage
                    imageUrl={
                      quiz.image_list && quiz.image_list.length > 0
                        ? quiz.image_list[0].image
                        : null
                    }
                  />

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
