import React, { useEffect, useState } from "react";
import { useApiAxios } from "../api";
import {
  Card,
  Container,
  Row,
  Col,
  Spinner,
  Alert,
  ListGroup,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const DONE_STYLE = { textDecoration: "line-through" };

function CategoryList() {
  const [
    { data: origCategoryList = undefined, loading, error: loadingError },
    refetch,
  ] = useApiAxios("/quiz/category-list");
  const [categoryList, setCategoryList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setCategoryList(origCategoryList || []);
  }, [origCategoryList]);

  const handleClick = (categoryName) => {
    navigate(`/${categoryName}/`); 
  };

  return (
    <Container className="mt-4 p-0">
      <Card>
        <Card.Header> 자격증 목록 </Card.Header>
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
