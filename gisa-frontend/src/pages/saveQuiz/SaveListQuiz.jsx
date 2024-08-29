import React, { useState, useEffect } from "react";
import { makeRestApi, useApiAxios } from "../../api";
import { useNavigate } from "react-router-dom";
import QuizList from "../../components/practical/SaveQuizList";

const SAVELIST_REST_API = makeRestApi("quiz/api/save");

function SaveQuizList() {
  const [{ data: origSaveQuiz = undefined, loading }, refetch] = useApiAxios(
    "quiz/api/save"
  );
  const [quiz, setQuiz] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await SAVELIST_REST_API.list();
        if (data) {
          setQuiz([...data]);
        }
      } catch (error) {
        console.error("데이터 가져오기 실패:", error);
      }
    };

    fetchData();
  }, []);

  const handleQuizClick = (quizItem) => {
    navigate(`${quizItem.id}`);
  };

  return (
    <QuizList quizzes={quiz} onQuizClick={handleQuizClick} />
  );
}

export default SaveQuizList;
