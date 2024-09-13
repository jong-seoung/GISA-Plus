import React, { useState, useEffect } from "react";
import { Modal, Button, Form, InputGroup } from "react-bootstrap";
import { useApiAxios, makeRestApi } from "../../api";

const QuizInputModal = ({
  show,
  onHide,
  selectedQuiz,
  isEditMode,
  categoryName,
  handleSubmit,
}) => {
  const [{ data: origCategory = undefined, loading }, refetch] = useApiAxios(
    `quiz/api/category/?categoryName=${categoryName}`
  );
  const [category, setCategory] = useState([]);

  useEffect(() => {
    setCategory(origCategory || []);
  }, [origCategory]);

  const initialRetoreState = {
    title: "",
    image_list: [],
    version: "",
    answer: [
      { num: "", name: "" },
      { num: "", name: "" },
      { num: "", name: "" },
    ],
    categoryName: categoryName,
    unit: "",
    remove_image: [],
  };
  const [newQuiz, setNewQuiz] = useState(initialRetoreState);

  const [imagePreviews, setImagePreviews] = useState([]); // 새로 추가된 이미지 미리보기용
  const [selectedVersion, setSelectedVersion] = useState(undefined);

  useEffect(() => {
    if (isEditMode && selectedQuiz) {
      setNewQuiz({
        id: selectedQuiz.id,
        title: selectedQuiz.title,
        content: selectedQuiz.content,
        image_list: [
          ...selectedQuiz.image_list.map(img => ({
            id: img.id,
            image: img.image,
            isNew: false, // 기존 DB 이미지
          })),
        ],
        answer: selectedQuiz.answer.map(ans => ({
          num: ans.num,
          name: ans.name,
        })),
        categoryName: categoryName,
        version: selectedQuiz.unit.category.version,
        unit: selectedQuiz.unit.name,
        remove_image: [],
      });
    } else {
      setNewQuiz({
        title: "",
        content: "",
        image_list: [],
        version: "",
        answer: [
          { num: 1, name: "" },
          { num: 2, name: "" },
          { num: 3, name: "" },
        ],
        categoryName: categoryName,
        unit: "년도를 먼저 선택해주세요.",
      });
      setImagePreviews([]);
    }
  }, [isEditMode, selectedQuiz, onHide]);

  const handleImagePreview = files => {
    const fileArray = Array.from(files);
    const previews = fileArray.map(file => URL.createObjectURL(file));

    const newImages = fileArray.map(file => ({
      image: file,
      isNew: true,
    }));

    setNewQuiz(prevState => ({
      ...prevState,
      image_list: prevState.image_list.concat(newImages),
    }));

    setImagePreviews(prevState => prevState.concat(previews));
  };

  // 파일 추가 핸들러
  const handleInputChange = e => {
    const { name, value, files } = e.target;

    if (name === "image_list" && files) {
      handleImagePreview(files); // 미리보기 및 이미지 추가 처리
    } else {
      setNewQuiz(prevState => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleVersionChange = e => {
    const { name, value } = e.target;
    setNewQuiz(prevState => ({
      ...prevState,
      [name]: value,
      ["unit"]: "",
    }));
    setSelectedVersion(value);
  };

  // 이미지 삭제 핸들러 (기존 DB 이미지와 새 이미지 구분)
  const handleImageRemove = async index => {
    const updatedImages = newQuiz.image_list.filter((_, i) => i !== index);
    const removedImageId = newQuiz.image_list[index].id;
    console.log(index, newQuiz.image_list);
    setNewQuiz(prevState => ({
      ...prevState,
      image_list: updatedImages,
      remove_image: [...(prevState.remove_image || []), removedImageId],
    }));

    // 미리보기에서 새로 추가된 이미지 제거
    if (newQuiz.image_list[index].isNew) {
      const updatedPreviews = imagePreviews.filter((_, i) => i !== index);
      setImagePreviews(updatedPreviews);
    }
  };

  const handleAnswerChange = (index, value) => {
    const updatedanswer = newQuiz.answer.map((answer, i) =>
      i === index ? { ...answer, name: value, num: index + 1 } : answer
    );
    setNewQuiz({ ...newQuiz, answer: updatedanswer });
  };

  const handleAddAnswer = () => {
    setNewQuiz({
      ...newQuiz,
      answer: [...newQuiz.answer, { name: "", answer: false }],
    });
  };

  const handleRemoveAnswer = index => {
    const updatedanswer = newQuiz.answer.filter((_, i) => i !== index);
    setNewQuiz({ ...newQuiz, answer: updatedanswer });
  };

  return (
    <Modal show={show} onHide={onHide} size="xl">
      <Modal.Header closeButton>
        <Modal.Title>{isEditMode ? "문제 수정" : "문제 추가"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>년도</Form.Label>
            <Form.Select
              name="version"
              onChange={e => handleVersionChange(e, e.key)}
              value={newQuiz.version}
            >
              <option>{newQuiz.version}</option>
              {category
                .map((categoryItem, index) => (
                  <option key={index} value={categoryItem.version}>
                    {categoryItem.version}
                  </option>
                ))}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mt-3">
            <Form.Label>단원</Form.Label>
            <Form.Select
              name="unit"
              onChange={e => handleInputChange(e)}
              value={newQuiz.unit || ""}
            >
              {/* 기본 선택지 */}
              <option>
                {newQuiz.unit}
              </option>

              {/* 선택된 버전과 일치하는 카테고리의 유닛 목록을 렌더링 */}
              {category
                .filter(
                  categoryItem => categoryItem.version === newQuiz.version
                ) // 선택된 버전과 같은 카테고리 필터링
                .flatMap(categoryItem =>
                  categoryItem.unit.map((unitItem, index) => (
                    <option key={index} value={unitItem.name}>
                      {unitItem.name}
                    </option>
                  ))
                )}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mt-3">
            <Form.Label>제목</Form.Label>
            <Form.Control
              type="text"
              as="textarea"
              rows={3}
              value={newQuiz.title}
              onChange={e => handleInputChange(e)}
              name="title"
            />
          </Form.Group>

          <Form.Group className="mt-3">
            <Form.Label>본문</Form.Label>
            <Form.Control
              type="text"
              as="textarea"
              rows={5}
              value={newQuiz.content}
              onChange={e => handleInputChange(e)}
              name="content"
            />
          </Form.Group>

          {/* 이미지 처리 */}
          <Form.Group className="mt-3 mb-3">
            <Form.Label>이미지</Form.Label>
            {newQuiz.image_list && newQuiz.image_list.length > 0 && (
              <div className="mb-3">
                {newQuiz.image_list.map((imageData, index) => (
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
                      variant="danger"
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
              onChange={e => handleInputChange(e)}
              multiple
            />
          </Form.Group>
          {/* 답변 처리 부분 */}
          <Form.Label>정답</Form.Label>
          {newQuiz.answer.map((answer, index) => (
            <Form.Group key={index} className="d-flex align-items-center mb-3">
              <Form.Label className="mb-0" style={{ width: "100px" }}>{`${
                index + 1
              }.`}</Form.Label>
              <InputGroup>
                <Form.Control
                  type="text"
                  value={answer.name}
                  onChange={e => handleAnswerChange(index, e.target.value)}
                />
              </InputGroup>
              {newQuiz.answer.length > 1 && (
                <Button
                  variant="danger"
                  className="ms-2"
                  onClick={() => handleRemoveAnswer(index)}
                >
                  X
                </Button>
              )}
            </Form.Group>
          ))}
        </Form>
      </Modal.Body>
      <Button variant="primary" className="mb-5 w-75 m-auto" onClick={handleAddAnswer}>
        보기 추가
      </Button>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          취소
        </Button>
        <Button
          variant="primary"
          onClick={() => handleSubmit(newQuiz, isEditMode)}
        >
          {isEditMode ? "수정" : "저장"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default QuizInputModal;
