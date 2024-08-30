import React, { useEffect, useState } from "react";
import { Card, Container, ListGroup } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import CategoryHeader from "./CategoryHeader";  
import CategoryItem from "./CategoryItem";     
import { makeRestApi } from "../../api";

function CommonCategoryList({ apiUrl, titleSuffix }) {
  const { categoryName } = useParams();
  const VERSION_REST_API = makeRestApi(`${apiUrl}/?categoryName=${categoryName}`);
  const [categoryList, setCategoryList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await VERSION_REST_API.list();
        if (data) {
          setCategoryList([...data]);
        }
      } catch (error) {
        console.error("데이터 가져오기 실패:", error);
      }
    };

    fetchData();
  }, []);

  const handleClick = (version) => {
    navigate(`${version}/`);
  };

  return (
    <Container className="mt-4 p-0">
      <Card>
        <CategoryHeader title={`${categoryName} - ${titleSuffix}`} />
        <ListGroup variant="flush">
          {categoryList.map((category, index) => (
            <CategoryItem
              key={index}
              category={category}
              onClick={() => handleClick(category.version)}
            />
          ))}
        </ListGroup>
      </Card>
    </Container>
  );
}

export default CommonCategoryList;
