import React, { useEffect, useState } from "react";
import { useApiAxios } from "../api";
import {
  Card,
  Container,
  ListGroup,
  FormControl,
  InputGroup,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const DONE_STYLE = { textDecoration: "line-through" };

function CategoryList() {
  const [{ data: origCategoryList = [], loading, error: loadingError }, refetch] = useApiAxios("/quiz/category-list");
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
          {/* 검색 입력란 추가 */}
          <div style={{ position: "relative", width: "20%" }}>
            <form onSubmit={handleSubmit}>
              <InputGroup>
                <FormControl
                  placeholder="자격증 검색"
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setShowSuggestions(true);
                  }}
                  onBlur={() => setTimeout(() => setShowSuggestions(false), 100)}
                />
                {/* 검색어 미리보기 */}
                {showSuggestions && searchTerm && (
                  <ListGroup
                    className="position-absolute w-100"
                    style={{
                      zIndex: 1000,
                      top: "100%",
                      maxHeight: "150px",
                      overflowY: "auto",
                    }}
                  >
                    {origCategoryList
                      .filter((category) =>
                        category.name.toLowerCase().includes(searchTerm.toLowerCase())
                      )
                      .slice(0, 5)
                      .map((category, index) => (
                        <ListGroup.Item
                          key={index}
                          onClick={() => handleClick(category.name)}
                          style={{ cursor: "pointer" }}
                        >
                          {category.name}
                        </ListGroup.Item>
                      ))}
                  </ListGroup>
                )}
              </InputGroup>
            </form>
          </div>
        </Card.Header>
        <ListGroup variant="flush">
          {categoryList.map((category, index) => (
            <ListGroup.Item
              key={index}
              className="d-flex justify-content-between align-items-start"
            >
              <div
                style={{
                  cursor: "pointer",
                  ...(category.done ? DONE_STYLE : null),
                }}
                onClick={() => handleClick(category.name)}
              >
                {category.name}
              </div>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Card>
    </Container>
  );
}

export default CategoryList;
