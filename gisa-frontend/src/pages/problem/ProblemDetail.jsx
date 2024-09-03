import React, { useState, useEffect } from "react";
import { Button, Card, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useApiAxios } from "../../api";
import ProblemCard from "../../components/writing/ProblemCard";
import { useStatusContext } from "../../contexts/StatusContext";
import ProblemInputForm from "../../components/ProblemInputForm";

const ProblemList = () => {
  const { categoryName, version } = useParams();
  const [{ data: origProblem = undefined }] = useApiAxios(
    `problem/api/problem?categoryName=${categoryName}&version=${version}`
  );
  const [problem, setProblem] = useState([]);
  const [numStyle] = useState(["①", "②", "③", "④", "⑤"]);
  const [answerStates, setAnswerStates] = useState({});
  const [imageStates, setImageStates] = useState({});
  const { managed = [undefined] } = useStatusContext();
  const [showInputForm, setShowInputForm] = useState(false);

  const isManager = managed.includes(categoryName);

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

  const handleAddProblem = newProblem => {
    console.log(problem);
    console.log(newProblem);
    setProblem((prevProblems) => [...prevProblems, newProblem]);
    setShowInputForm(false);
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
              // deleteVersion={}
              // editVersion={}
            />
          ))}
        </Row>
        {isManager && showInputForm && (
              <ProblemInputForm
                onSubmit={handleAddProblem}
                onCancel={() => setShowInputForm(false)}
              />
            )}
        {isManager && !showInputForm &&(
          <>
            <Button
              className="text-center mt-2 mb-2 fw-bold"
              onClick={() => setShowInputForm(!showInputForm)}
            >
              추가
            </Button>
          </>
        )}
      </Card>
    </>
  );
};

export default ProblemList;
