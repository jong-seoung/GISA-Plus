import React, { useState, useEffect } from "react";
import QuizCategory from "../../components/practical/QuizCategory";
import QuizList from "../../components/practical/QuizList";
import { useApiAxios } from "../../api";

const CategoryManager = () => {
  const [{ data: origCategory = undefined, loading }, refetch] = useApiAxios(`quiz/api/category/`);
  const [category, setCategory] = useState([]);

  useEffect(() => {
    setCategory(origCategory || []);
  }, [origCategory]);

  return (
    <>
      <QuizCategory category={category} refetch={refetch} />
      <QuizList category={category} />
    </>
  );
};

export default CategoryManager;
