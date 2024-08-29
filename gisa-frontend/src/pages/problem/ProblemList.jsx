import React from "react";
import CommonCategoryList from "../../components/wp/CategoryList";

function CategoryListForProblem() {
  return <CommonCategoryList apiUrl="/problem/api/category" titleSuffix="필기 기출" />;
}

export default CategoryListForProblem;
