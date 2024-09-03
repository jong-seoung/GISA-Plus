import React, { useState } from "react";
import { Form, Button, InputGroup, Row, Col } from "react-bootstrap";

const ProblemInputForm = ({ onSubmit, onCancel }) => {
  const [newProblem, setNewProblem] = useState({
    num: "",
    title: "",
    correct_rate: "",
    image_list: [],
    answers: [
      { name: "", answer: false },
      { name: "", answer: false },
      { name: "", answer: false },
      { name: "", answer: false },
    ],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProblem({ ...newProblem, [name]: value });
  };

  const handleAnswerChange = (index, value) => {
    const updatedAnswers = newProblem.answers.map((answer, i) =>
      i === index ? { ...answer, name: value } : answer
    );
    setNewProblem({ ...newProblem, answers: updatedAnswers });
  };

  const handleCheckboxChange = (index) => {
    const updatedAnswers = newProblem.answers.map((answer, i) =>
      i === index ? { ...answer, answer: !answer.answer } : { ...answer, answer: false }
    );
    setNewProblem({ ...newProblem, answers: updatedAnswers });
  };

  const handleAddAnswer = () => {
    setNewProblem({
      ...newProblem,
      answers: [...newProblem.answers, { name: "", answer: false }],
    });
  };

  const handleRemoveAnswer = (index) => {
    const updatedAnswers = newProblem.answers.filter((_, i) => i !== index);
    setNewProblem({ ...newProblem, answers: updatedAnswers });
  };

  const handleSubmit = () => {
    onSubmit(newProblem);
    setNewProblem({
      num: "",
      title: "",
      image_list: [],
      correct_rate: "",
      answers: [
        { name: "", answer: false },
        { name: "", answer: false },
        { name: "", answer: false },
        { name: "", answer: false },
      ],
    });
  };

  return (
    <div className="mt-3 p-5">
      <Form.Group className="d-flex align-items-center">
        <Form.Label className="mb-0" style={{ width: "100px" }}>
          문제 번호
        </Form.Label>
        <Form.Control
          type="number"
          name="num"
          value={newProblem.num}
          onChange={handleInputChange}
          min={1}
          max={99}
        />
      </Form.Group>
      <Form.Group className="d-flex align-items-center mt-3">
        <Form.Label className="mb-0" style={{ width: "100px" }}>
          문제 제목
        </Form.Label>
        <Form.Control
          type="text"
          name="title"
          as="textarea"
          rows={3}
          value={newProblem.title}
          onChange={handleInputChange}
        />
      </Form.Group>
      <Form.Group className="d-flex align-items-center mt-3">
        <Form.Label className="mb-0" style={{ width: "100px" }}>
          이미지
        </Form.Label>
        <Form.Control type="file" name="image_list" multiple />
      </Form.Group>
      <Form.Group className="d-flex align-items-center mt-3">
        <Form.Label className="mb-0" style={{ width: "100px" }}>
          정답률
        </Form.Label>
        <Form.Control
          type="number"
          name="correct_rate"
          value={newProblem.correct_rate}
          onChange={handleInputChange}
          min={0}
          max={100}
        />
      </Form.Group>

      {newProblem.answers.map((answer, index) => (
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
          {newProblem.answers.length > 1 && (
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

      <Row className="mt-3">
        <Col sm={4}></Col>
        <Col sm={4}>
          <Button className="w-100" variant="primary" onClick={handleAddAnswer}>
            보기 추가
          </Button>
        </Col>
        <Col sm={4}>
          <Row>
            <Col sm={6}>
              <Button
                className="w-100"
                variant="success"
                onClick={handleSubmit}
              >
                저장
              </Button>
            </Col>
            <Col sm={6}>
              <Button
                className="w-100"
                variant="secondary"
                onClick={onCancel}
              >
                취소
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default ProblemInputForm;
