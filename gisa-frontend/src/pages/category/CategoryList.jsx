import React, { useEffect, useState } from "react";
import { useApiAxios } from "../../api";
import { Card, Container, ListGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import SearchBar from "../../components/gisa/SearchBar";
import CategoryItem from "../../components/gisa/CategoryItem";

function CategoryList() {
  const [{ data: origCategoryList = undefined, loading, error: loadingError }, refetch] = useApiAxios("/quiz/category-list");
  const [categoryList, setCategoryList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setCategoryList(origCategoryList || []);
  }, [origCategoryList]);

  const handleClick = (categoryName) => {
    navigate(`/${categoryName}/`);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      const filteredCategoryList = origCategoryList.filter((category) =>
        category.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setCategoryList(filteredCategoryList);
    } else {
      setCategoryList(origCategoryList);
    }
    setShowSuggestions(false);
  };

  return (
    <Container className="mt-4 p-0">
      <Card>
        <Card.Header className="d-flex justify-content-between align-items-center">
          <div><h4 className="mt-2">자격증 목록</h4></div>
          <SearchBar
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            showSuggestions={showSuggestions}
            setShowSuggestions={setShowSuggestions}
            origCategoryList={origCategoryList}
            handleClick={handleClick}
            handleSubmit={handleSubmit}
          />
        </Card.Header>
        <ListGroup variant="flush">
          {categoryList.map((category, index) => (
            <CategoryItem
              key={index}
              category={category}
              onClick={handleClick}
            />
          ))}
        </ListGroup>
      </Card>
    </Container>
  );
}

export default CategoryList;
