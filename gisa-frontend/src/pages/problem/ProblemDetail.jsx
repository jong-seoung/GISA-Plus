import React, { useState, useEffect } from "react";
import { Button, Card, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useApiAxios, makeRestApi } from "../../api";
import ProblemCard from "../../components/writing/ProblemCard";
import { useStatusContext } from "../../contexts/StatusContext";
import ProblemInputForm from "../../components/ProblemInputForm";

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
  console.log(problem);
  const handleAddProblem = async newProblem => {
    const formData = new FormData();

    // 기본 데이터 추가
    formData.append("num", newProblem.num);
    formData.append("title", newProblem.title);
    formData.append("correct_rate", newProblem.correct_rate);
    formData.append("version", newProblem.version);
    formData.append("categoryName", newProblem.categoryName);

    newProblem.answer.forEach((item, index) => {
      formData.append(`answer[${index}]name`, item.name);
      formData.append(`answer[${index}]answer`, item.answer);
    });

    if (newProblem.image_list && newProblem.image_list.length > 0) {
      newProblem.image_list.forEach((file, index) => {
        formData.append(`images`, file);
      });
    }

    const { data, error } = await PROBLEM_REST_API.create(formData);
    if (data) {
      setShowInputForm(false);
      window.location.reload();
    }
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
            categoryName={categoryName}
            version={version}
            onSubmit={handleAddProblem}
            onCancel={() => setShowInputForm(false)}
          />
        )}
        {isManager && !showInputForm && (
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
