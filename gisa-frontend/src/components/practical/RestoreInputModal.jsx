import React, { useState, useEffect } from "react";
import { Modal, Button, Form, InputGroup } from "react-bootstrap";

const RestoreInputModal = ({
  show,
  onHide,
  selectedRestore,
  isEditMode,
  categoryName,
  version,
  handleSubmit,
}) => {
  const initialRetoreState = {
    num: "",
    title: "",
    image_list: [],
    version: version,
    answer: [
      { num: "", name: "" },
      { num: "", name: "" },
      { num: "", name: "" },
    ],
    categoryName: categoryName,
    remove_image: [],
  };
  const [newRestore, setNewRestore] = useState(initialRetoreState);

  const [imagePreviews, setImagePreviews] = useState([]); // 새로 추가된 이미지 미리보기용

  useEffect(() => {
    if (isEditMode && selectedRestore) {
      setNewRestore({
        id: selectedRestore.id,
        num: selectedRestore.num,
        title: selectedRestore.title,
        content: selectedRestore.content,
        image_list: [
          ...selectedRestore.image_list.map(img => ({
            id: img.id,
            image: img.image,
            isNew: false, // 기존 DB 이미지
          })),
        ],
        version: version,
        answer: selectedRestore.answer.map(ans => ({
          num: ans.num,
          name: ans.name,
        })),
        categoryName: categoryName,
        remove_image: [],
      });
    } else {
      setNewRestore({
        num: "",
        title: "",
        content: "",
        image_list: [],
        version: version,
        answer: [
          { num: 1, name: "" },
          { num: 2, name: "" },
          { num: 3, name: "" },
        ],
        categoryName: categoryName,
      });
      setImagePreviews([]);
    }
  }, [isEditMode, selectedRestore, onHide]);

  const handleImagePreview = files => {
    const fileArray = Array.from(files);
    const previews = fileArray.map(file => URL.createObjectURL(file));

    const newImages = fileArray.map(file => ({
      image: file,
      isNew: true,
    }));

    setNewRestore(prevState => ({
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
      setNewRestore(prevState => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  // 이미지 삭제 핸들러 (기존 DB 이미지와 새 이미지 구분)
  const handleImageRemove = async index => {
    const updatedImages = newRestore.image_list.filter((_, i) => i !== index);
    const removedImageId = newRestore.image_list[index].id;

    setNewRestore(prevState => ({
      ...prevState,
      image_list: updatedImages,
      remove_image: [...(prevState.remove_image || []), removedImageId],
    }));
    
    // 미리보기에서 새로 추가된 이미지 제거
    if (newRestore.image_list[index].isNew) {
      const updatedPreviews = imagePreviews.filter((_, i) => i !== index);
      setImagePreviews(updatedPreviews);
    }
  };

  const handleAnswerChange = (index, value) => {
    const updatedanswer = newRestore.answer.map((answer, i) =>
      i === index ? { ...answer, name: value, num: index+1 } : answer
    );
    setNewRestore({ ...newRestore, answer: updatedanswer  });
  };

  const handleAddAnswer = () => {
    setNewRestore({
      ...newRestore,
      answer: [...newRestore.answer, { name: "", answer: false }],
    });
  };

  const handleRemoveAnswer = index => {
    const updatedanswer = newRestore.answer.filter((_, i) => i !== index);
    setNewRestore({ ...newRestore, answer: updatedanswer });
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
              value={newRestore.num}
              onChange={e => handleInputChange(e)}
              name="num"
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>제목</Form.Label>
            <Form.Control
              type="text"
              as="textarea"
              rows={3}
              value={newRestore.title}
              onChange={e => handleInputChange(e)}
              name="title"
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>본문</Form.Label>
            <Form.Control
              type="text"
              as="textarea"
              rows={5}
              value={newRestore.content}
              onChange={e => handleInputChange(e)}
              name="content"
            />
          </Form.Group>

          {/* 이미지 처리 */}
          <Form.Group className="mt-3">
            <Form.Label>이미지</Form.Label>
            {newRestore.image_list && newRestore.image_list.length > 0 && (
              <div className="mb-3">
                {newRestore.image_list.map((imageData, index) => (
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
          {newRestore.answer.map((answer, index) => (
            <Form.Group key={index} className="d-flex align-items-center mt-3">
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
              {newRestore.answer.length > 1 && (
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
      <Button variant="primary" className="mt-3" onClick={handleAddAnswer}>
            보기 추가
          </Button>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          취소
        </Button>
        <Button
          variant="primary"
          onClick={() => handleSubmit(newRestore, isEditMode)}
        >
          {isEditMode ? "수정" : "저장"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default RestoreInputModal;
