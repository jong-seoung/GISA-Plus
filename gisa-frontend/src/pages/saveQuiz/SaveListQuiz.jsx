import React, { useState, useEffect } from "react";
import { makeRestApi, useApiAxios } from "../../api";
import { useNavigate } from "react-router-dom";
import QuizList from "../../components/practical/SaveQuizList";
import { useParams } from "react-router-dom";

const SAVELIST_REST_API = makeRestApi("quiz/api/save");

function SaveQuizList() {
  const [quiz, setQuiz] = useState([]);
  const navigate = useNavigate();
  const { categoryName } = useParams();

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
    <QuizList quizzes={quiz} categoryName={categoryName} onQuizClick={handleQuizClick} />
  );
}

export default SaveQuizList;
