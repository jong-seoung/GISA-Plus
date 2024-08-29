import React, { useEffect, useState } from "react";
import { useApiAxios, makeRestApi } from "../../api";
import {
  Card,
  Container,
  ListGroup,
  FormControl,
  InputGroup,
} from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

const DONE_STYLE = { textDecoration: "line-through" };


function CategoryList() {
  const { categoryName } = useParams();
  const VERSION_REST_API = makeRestApi(`/problem/api/category/${categoryName}`);
  const [categoryList, setCategoryList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await VERSION_REST_API.list();
        if (data) {
          setCategoryList((prev) => [...data]); 
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
        <Card.Header className="d-flex justify-content-between align-items-center">
          <div><h4 className="mt-2">{categoryName} - 필기 기출</h4></div>
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
                onClick={() => handleClick(category.version)}
              >
                {category.version}
              </div>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Card>
    </Container>
  );
}

export default CategoryList;
