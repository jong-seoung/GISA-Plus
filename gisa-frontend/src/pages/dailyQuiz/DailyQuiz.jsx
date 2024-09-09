import React, { useEffect, useState } from "react";
import { useApiAxios, makeRestApi } from "../../api";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import QuizHeader from "../../components/practical/QuizHeader";
import QuizImage from "../../components/practical/Image";
import QuizTitle from "../../components/practical/QuizTitle";
import QuizContent from "../../components/practical/RestoreContent";
import QuizAnswers from "../../components/practical/Answers";
import NextButton from "../../components/practical/NextButton";
import EditButtons from "../../components/button/EditButton";
import DeleteButtons from "../../components/button/DeleteButton";
import { useStatusContext } from "../../contexts/StatusContext";
import QuizInputModal from "../../components/practical/QuizInputModal";

const SAVE_REST_API = makeRestApi("quiz/api/save/");

function DailyQuiz() {
  const { categoryName } = useParams();
  const [{ data: origQuiz = undefined, loading }, refetch] = useApiAxios(
    `quiz/api/quiz/0?categoryName=${categoryName}`
  );
  const Quiz_REST_API = makeRestApi(`/quiz/api/quiz/`);

  const [quiz, setQuiz] = useState([]);
  const [showAnswers, setShowAnswers] = useState(false);
  const { managed = [undefined] } = useStatusContext();

  const isManager = managed.includes(categoryName);

  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedQuiz, setSelectedQuiz] = useState(null);

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

  const handleAdd = () => {
    setSelectedQuiz(null);
    setShowEditModal(true);
  };

  const handleEdit = quiz => {
    setSelectedQuiz(quiz);
    setShowEditModal(true);
  };

  const handleDelete = async quiz => {
    const QuizToDelete = quiz;
    if (window.confirm(`'${QuizToDelete.title}'를 삭제하시겠습니까?`)) {
      const { data, response } = await Quiz_REST_API.delete(QuizToDelete.id);
      if (response?.status === 204) {
        handleNextPage();
      }
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
      url: `quiz/api/quiz/${quiz.id}?categoryName=${categoryName}`,
      method: "GET",
    });
  };

  const handleSubmit = async (newQuiz, isEditMode) => {
    const formData = new FormData();
    formData.append("title", newQuiz.title);
    formData.append("content", newQuiz.content);
    formData.append("version", newQuiz.version);
    formData.append("categoryName", newQuiz.categoryName);
    formData.append("unit_name", newQuiz.unit);

    newQuiz.answer.forEach((item, index) => {
      formData.append(`answer[${index}]num`, item.num);
      formData.append(`answer[${index}]name`, item.name);
    });

    if (newQuiz.remove_image && newQuiz.remove_image.length > 0) {
      newQuiz.remove_image.forEach((item, index) => {
        console.log(newQuiz.remove_image);
        formData.append(`remove_image`, item);
      });
    }

    if (newQuiz.image_list && newQuiz.image_list.length > 0) {
      newQuiz.image_list.forEach(file => {
        if (file.isNew) {
          formData.append("images", file.image);
        }
      });
    }

    try {
      let response;
      if (isEditMode) {
        console.log("newQuiz:", newQuiz);
        response = await Quiz_REST_API.update(newQuiz.id, formData);
      } else {
        response = await Quiz_REST_API.create(formData);
      }

      if (response.data) {
        console.log(response.data);
        setShowEditModal(false);
        window.location.reload();
      }
    } catch (error) {
      console.error("문제 전송 중 오류 발생:", error);
    }
  };

  const handleEditChange = (field, value) => {
    setSelectedQuiz(prev => ({ ...prev, [field]: value }));
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

                  <QuizTitle title={quiz.title} />
                  {isManager && (
                    <div className="mb-3">
                      <Button
                        variant="outline-success"
                        size="sm"
                        className="me-2"
                        onClick={() => handleAdd()}
                      >
                        추가
                      </Button>
                      <EditButtons onEdit={() => handleEdit(quiz)} />
                      <DeleteButtons onDelete={() => handleDelete(quiz)} />
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
          <QuizInputModal
            show={showEditModal}
            onHide={() => setShowEditModal(false)}
            selectedQuiz={selectedQuiz}
            handleEditChange={handleEditChange}
            handleSubmit={handleSubmit}
            isEditMode={!!selectedQuiz}
            categoryName={categoryName}
            // version={version}
          />
        </Col>
      </Row>
    </Container>
  );
}

export default DailyQuiz;
