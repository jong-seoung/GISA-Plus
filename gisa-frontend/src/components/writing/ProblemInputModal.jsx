import React, { useState, useEffect } from "react";
import { Modal, Button, Form, InputGroup } from "react-bootstrap";
import { makeRestApi } from "../../api";

const ProblemModal = ({
  show,
  onHide,
  selectedProblem,
  isEditMode,
  categoryName,
  version,
  handleSubmit,
}) => {
  const initialProblemState = {
    num: "",
    title: "",
    correct_rate: "",
    image_list: [], // 기존 및 새 이미지 통합 배열
    version: version,
    answer: [
      { name: "", answer: false },
      { name: "", answer: false },
      { name: "", answer: false },
      { name: "", answer: false },
    ],
    categoryName: categoryName,
    remove_image: [],
  };

  const [newProblem, setNewProblem] = useState(initialProblemState);

  const [imagePreviews, setImagePreviews] = useState([]); // 새로 추가된 이미지 미리보기용

  useEffect(() => {
    if (isEditMode && selectedProblem) {
      setNewProblem({
        id: selectedProblem.id,
        num: selectedProblem.num,
        title: selectedProblem.title,
        correct_rate: selectedProblem.correct_rate,
        image_list: [
          ...selectedProblem.image_list.map((img) => ({
            id: img.id,
            image: img.image,
            isNew: false, // 기존 DB 이미지
          })),
        ],
        version: selectedProblem.version,
        answer: selectedProblem.answer.map((ans) => ({
          name: ans.name,
          answer: ans.answer,
        })),
        categoryName: selectedProblem.categoryName,
        remove_image: [],
      });
    } else {
      setNewProblem({
        num: "",
        title: "",
        correct_rate: "",
        image_list: [],
        version: version,
        answer: [
          { name: "", answer: false },
          { name: "", answer: false },
          { name: "", answer: false },
          { name: "", answer: false },
        ],
        categoryName: categoryName,
      });
      setImagePreviews([]);
    }
  }, [isEditMode, selectedProblem, onHide]);

  // 이미지 미리보기 핸들러
  const handleImagePreview = (files) => {
    const fileArray = Array.from(files);
    const previews = fileArray.map((file) => URL.createObjectURL(file));

    const newImages = fileArray.map((file) => ({
      image: file,
      isNew: true, 
    }));

    setNewProblem((prevState) => ({
      ...prevState,
      image_list: prevState.image_list.concat(newImages),
    }));

    setImagePreviews((prevState) => prevState.concat(previews));
  };

  // 파일 추가 핸들러
  const handleInputChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image_list" && files) {
      handleImagePreview(files); // 미리보기 및 이미지 추가 처리
    } else {
      setNewProblem((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  // 이미지 삭제 핸들러 (기존 DB 이미지와 새 이미지 구분)
  const handleImageRemove = async(index) => {
    const updatedImages = newProblem.image_list.filter((_, i) => i !== index);
    const removedImageId = newProblem.image_list[index].id;

    setNewProblem((prevState) => ({
      ...prevState,
      image_list: updatedImages,
      remove_image: [...(prevState.remove_image || []), removedImageId],
    }));
    // 미리보기에서 새로 추가된 이미지 제거
    if (newProblem.image_list[index].isNew) {
      const updatedPreviews = imagePreviews.filter((_, i) => i !== index);
      setImagePreviews(updatedPreviews);
    } 
  };

  const handleAnswerChange = (index, value) => {
    const updatedanswer = newProblem.answer.map((answer, i) =>
      i === index ? { ...answer, name: value } : answer
    );
    setNewProblem({ ...newProblem, answer: updatedanswer });
  };

  const handleCheckboxChange = (index) => {
    const updatedanswer = newProblem.answer.map((answer, i) =>
      i === index
        ? { ...answer, answer: !answer.answer }
        : { ...answer, answer: false }
    );
    setNewProblem({ ...newProblem, answer: updatedanswer });
  };

  const handleAddAnswer = () => {
    setNewProblem({
      ...newProblem,
      answer: [...newProblem.answer, { name: "", answer: false }],
    });
  };

  const handleRemoveAnswer = (index) => {
    const updatedanswer = newProblem.answer.filter((_, i) => i !== index);
    setNewProblem({ ...newProblem, answer: updatedanswer });
  };

  return (
    <Modal show={show} onHide={onHide} size="xl">
      <Modal.Header closeButton>
        <Modal.Title>{isEditMode ? "문제 수정" : "문제 추가"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>문제 번호</Form.Label>
            <Form.Control
              type="text"
              value={newProblem.num}
              onChange={(e) => handleInputChange(e)}
              name="num"
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>제목</Form.Label>
            <Form.Control
              type="text"
              as="textarea"
              rows={3}
              value={newProblem.title}
              onChange={(e) => handleInputChange(e)}
              name="title"
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>정답률</Form.Label>
            <Form.Control
              type="number"
              value={newProblem.correct_rate}
              onChange={(e) => handleInputChange(e)}
              name="correct_rate"
            />
          </Form.Group>

          {/* 이미지 처리 */}
          <Form.Group className="mt-3">
            <Form.Label>이미지</Form.Label>
            {newProblem.image_list && newProblem.image_list.length > 0 && (
              <div className="mb-3">
                {newProblem.image_list.map((imageData, index) => (
                  <div key={index} className="d-flex align-items-center">
                    <img
                      key={index}
                      src={
                        imageData.isNew
                          ? URL.createObjectURL(imageData.image)
                          : imageData.image
                      }
                      alt={`이미지 ${index}`}
                      style={{
                        width: "50%",
                        height: "auto",
                      }}
                    />
                    <Button
                      variant="outline-danger"
                      onClick={() => handleImageRemove(index)}
                    >
                      X
                    </Button>
                  </div>
                ))}
              </div>
            )}
            <Form.Control
              type="file"
              name="image_list"
              onChange={(e) => handleInputChange(e)}
              multiple
            />
          </Form.Group>

          {/* 답변 처리 부분 */}
          {newProblem.answer.map((answer, index) => (
            <Form.Group key={index} className="d-flex align-items-center mt-3">
              <Form.Label className="mb-0" style={{ width: "100px" }}>{`보기 ${
                index + 1
              }`}</Form.Label>
              <InputGroup>
                <InputGroup.Checkbox
                  checked={answer.answer}
                  onChange={() => handleCheckboxChange(index)}
                />
                <Form.Control
                  type="text"
                  value={answer.name}
                  onChange={(e) => handleAnswerChange(index, e.target.value)}
                />
              </InputGroup>
              {newProblem.answer.length > 1 && (
                <Button
                  variant="outline-danger"
                  className="ms-2"
                  onClick={() => handleRemoveAnswer(index)}
                >
                  X
                </Button>
              )}
            </Form.Group>
          ))}

          <Button variant="outline-primary" className="mt-3" onClick={handleAddAnswer}>
            보기 추가
          </Button>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-secondary" onClick={onHide}>
          취소
        </Button>
        <Button variant="outline-primary" onClick={() => handleSubmit(newProblem, isEditMode)}>
          {isEditMode ? "수정" : "저장"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ProblemModal;
