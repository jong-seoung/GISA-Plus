import React, { useState, useEffect } from "react";
import { Card, Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useApiAxios } from "../../api";

const ProblemList = () => {
  const { categoryName, version } = useParams();
  const [{ data: origProblem = undefined }] =
    useApiAxios(`problem/api/problem?category=${categoryName}&version=${version}`);
  const [problem, setProblem] = useState([]);
  const [numStyle] = useState(["①", "②", "③", "④", "⑤"]);
  const [answerStates, setAnswerStates] = useState({}); 
  const [imageStates, setImageStates] = useState({});

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

  return (
    <>
      <div className="text-center mb-3"><h2>{version} {categoryName} 필기</h2></div>
      <Card>
        <Row>
          {problem.map((problemItem, problemIndex) => (
            <Col
              key={problemIndex}
              md={6}
              style={{
                borderRight: problemIndex % 2 === 0 ? "1px solid #ccc" : "none",
                position: "relative", 
              }}
            >
              {imageStates[`${problemIndex}`] === undefined ||
              Object.keys(imageStates[`${problemIndex}`]).length === 0 ? (
                ""
              ) : imageStates[`${problemIndex}`] === "true" ? (
                <img
                  src="http://localhost:8000/media/problem/correct/correct.png"
                  draggable="false"
                  alt="왼쪽 이미지"
                  style={{
                    position: "absolute",
                    top: -25,
                    left: -10,
                    zIndex: 0,
                    width: "30%", 
                    clipPath: "inset(0 50% 0 0)", 
                  }}
                />
              ) : (
                <img
                  src="http://localhost:8000/media/problem/correct/correct.png"
                  draggable="false"
                  alt="오른쪽 이미지"
                  style={{
                    position: "absolute",
                    top: -25,
                    left: -90,
                    zIndex: 0,
                    width: "30%", 
                    clipPath: "inset(0 0 0 50%)", 
                  }}
                />
              )}

              <Card.Body style={{ position: "relative", zIndex: 0 }}>
                <Row className="mb-2">
                  <Col>
                    <Card.Title className="fs-5 fw-bold">
                      {problemItem.num}. {problemItem.title}
                    </Card.Title>
                  </Col>
                </Row>

                <Col>
                  {problemItem.answer &&
                    problemItem.answer.map((answerItem, answerIndex) => {
                      const state =
                        answerStates[`${problemIndex}-${answerIndex}`];
                      const isCorrect = state === "correct";
                      const isWrong = state === "wrong";
                      return (
                        <div key={answerIndex}
                          onClick={
                            imageStates[`${problemIndex}`] === undefined ||
                            Object.keys(imageStates[`${problemIndex}`])
                              .length === 0
                              ? () =>
                                  handleAnswer(
                                    problemIndex,
                                    answerIndex,
                                    answerItem
                                  )
                              : undefined
                          }
                          style={{
                            color: isWrong
                              ? "red"
                              : isCorrect
                              ? "green"
                              : "inherit",
                            textDecoration:
                              isWrong || isCorrect ? "underline" : "none",
                          }}
                        >
                          <p className="fw-normal fs-6">
                            {numStyle[answerIndex]} {answerItem.name}
                          </p>
                        </div>
                      );
                    })}
                </Col>

                <div>
                  <Col>
                    <small className="text-end d-block">
                      정답률: {problemItem.correct_rate || 0}%
                    </small>
                  </Col>
                </div>
              </Card.Body>
            </Col>
          ))}
        </Row>
      </Card>
    </>
  );
};

export default ProblemList;
