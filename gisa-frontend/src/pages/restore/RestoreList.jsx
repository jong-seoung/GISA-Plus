import React from "react";
import CommonCategoryList from "../../components/wp/CategoryList";

function CategoryListForRestore() {
  return (
    <CommonCategoryList
      apiUrl="/restore/api/category"
      titleSuffix="실기 복원"
    />
  );
}

export default CategoryListForRestore;
