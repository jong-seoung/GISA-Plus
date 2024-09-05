import React, { useState, useEffect } from "react";
import { Button, Card, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useApiAxios, makeRestApi } from "../../api";
import ProblemCard from "../../components/writing/ProblemCard";
import { useStatusContext } from "../../contexts/StatusContext";
import ProblemInputModal from "../../components/writing/ProblemInputModal";

const ProblemList = () => {
  const { categoryName, version } = useParams();
  const [{ data: origProblem = undefined }] = useApiAxios(
    `problem/api/problem?categoryName=${categoryName}&version=${version}`
  );
  const PROBLEM_REST_API = makeRestApi(`/problem/api/problem/`);

  const [problem, setProblem] = useState([]);
  const [numStyle] = useState(["①", "②", "③", "④", "⑤"]);
  const [answerStates, setAnswerStates] = useState({});
  const [imageStates, setImageStates] = useState({});
  const { managed = [undefined] } = useStatusContext();

  const isManager = managed.includes(categoryName);

  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedProblem, setSelectedProblem] = useState(null);

  useEffect(() => {
    setProblem(origProblem || []);
  }, [origProblem]);

  const handleAnswer = (problemIndex, answerIndex, answerItem) => {
    setAnswerStates(prevState => ({
      ...prevState,
      [`${problemIndex}-${answerIndex}`]: answerItem.answer
        ? "correct"
        : "wrong",
    }));
    setImageStates(prevState => ({
      ...prevState,
      [`${problemIndex}`]: answerItem.answer ? "true" : "false",
    }));
  };

  const handleEdit = problemIndex => {
    setSelectedProblem(problem[problemIndex]);
    setShowEditModal(true);
  };

  const handleAdd = () => {
    setSelectedProblem(null);
    setShowEditModal(true);
  };

  const handleDelete = async problemIndex => {
    const problemToDelete = problem[problemIndex];
    if (window.confirm(`'${problemToDelete.title}'를 삭제하시겠습니까?`)) {
      const { data, response } = await PROBLEM_REST_API.delete(
        problemToDelete.id
      );
      if (response?.status === 204) {
        setProblem(prev => {
          return prev.filter((_, index) => index !== problemIndex);
        });
      }
    }
  };

  const handleSubmit = async (newProblem, isEditMode) => {
    const formData = new FormData();

    formData.append("num", newProblem.num);
    formData.append("title", newProblem.title);
    formData.append("correct_rate", newProblem.correct_rate);
    formData.append("version", newProblem.version);
    formData.append("categoryName", newProblem.categoryName);

    newProblem.answer.forEach((item, index) => {
      formData.append(`answer[${index}]name`, item.name);
      formData.append(`answer[${index}]answer`, item.answer);
    });

    if (newProblem.remove_image && newProblem.remove_image.length > 0) {
      newProblem.remove_image.forEach((item, index) => {
        formData.append(`remove_image`, item);
      });
    }

    if (newProblem.image_list && newProblem.image_list.length > 0) {
      newProblem.image_list.forEach(file => {
        if (file.isNew) {
          formData.append("images", file.image); // 새로 추가된 이미지만 추가
        }
      });
    }

    try {
      let response;
      if (isEditMode) {
        response = await PROBLEM_REST_API.update(newProblem.id, formData);
      } else {
        response = await PROBLEM_REST_API.create(formData);
      }

      if (response.data) {
        setShowEditModal(false);
        window.location.reload();
      }
    } catch (error) {
      console.error("문제 전송 중 오류 발생:", error);
    }
  };

  const handleEditChange = (field, value) => {
    setSelectedProblem(prev => ({ ...prev, [field]: value }));
  };
  return (
    <>
      <div className="text-center mb-3">
        <h2>
          {version} {categoryName} 필기
        </h2>
      </div>
      <Card>
        <Row>
          {problem.map((problemItem, problemIndex) => (
            <ProblemCard
              key={problemIndex}
              problemItem={problemItem}
              problemIndex={problemIndex}
              numStyle={numStyle}
              answerStates={answerStates}
              handleAnswer={handleAnswer}
              imageStates={imageStates}
              isManager={isManager}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
            />
          ))}
        </Row>
        {isManager && (
          <>
            <Button
              className="text-center mt-2 mb-2 fw-bold"
              onClick={() => handleAdd()}
            >
              추가
            </Button>
          </>
        )}
      </Card>
      <ProblemInputModal
        show={showEditModal}
        onHide={() => setShowEditModal(false)}
        selectedProblem={selectedProblem}
        handleEditChange={handleEditChange}
        handleSubmit={handleSubmit}
        isEditMode={!!selectedProblem}
        categoryName={categoryName}
        version={version}
      />
    </>
  );
};

export default ProblemList;
