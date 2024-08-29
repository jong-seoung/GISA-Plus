import React, { useState, useEffect } from "react";
import { Card, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useApiAxios } from "../../api";
import ProblemCard from "../../components/writing/ProblemCard";

const ProblemList = () => {
  const { categoryName, version } = useParams();
  const [{ data: origProblem = undefined }] = useApiAxios(
    `problem/api/problem?category=${categoryName}&version=${version}`
  );
  const [problem, setProblem] = useState([]);
  const [numStyle] = useState(["①", "②", "③", "④", "⑤"]);
  const [answerStates, setAnswerStates] = useState({});
  const [imageStates, setImageStates] = useState({});

  useEffect(() => {
    setProblem(origProblem || []);
  }, [origProblem]);

  const handleAnswer = (problemIndex, answerIndex, answerItem) => {
    setAnswerStates((prevState) => ({
      ...prevState,
      [`${problemIndex}-${answerIndex}`]: answerItem.answer ? "correct" : "wrong",
    }));
    setImageStates((prevState) => ({
      ...prevState,
      [`${problemIndex}`]: answerItem.answer ? "true" : "false",
    }));
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
            />
          ))}
        </Row>
      </Card>
    </>
  );
};

export default ProblemList;
