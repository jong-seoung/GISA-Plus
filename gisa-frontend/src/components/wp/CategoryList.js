import React, { useEffect, useState, version } from "react";
import { Card, Container, ListGroup, Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { produce } from "immer";
import CategoryHeader from "./CategoryHeader";
import CategoryItem from "./CategoryItem";
import { useApiAxios, makeRestApi } from "../../api";
import { useStatusContext } from "../../contexts/StatusContext";

function CommonCategoryList({ apiUrl, titleSuffix }) {
  const { categoryName } = useParams();
  const VERSION_REST_API = makeRestApi(`${apiUrl}/`);
  const [
    { data: origCategory = undefined, loading, error: loadingError },
    refetch,
  ] = useApiAxios(`${apiUrl}/?categoryName=${categoryName}`);

  const [categoryList, setCategoryList] = useState([]);
  const navigate = useNavigate();
  const { managed = [undefined] } = useStatusContext();

  const isManager = managed.includes(categoryName);

  useEffect(() => {
    setCategoryList(origCategory || []);
  }, [origCategory]);

  const handleClick = version => {
    navigate(`${version}/`);
  };

  const addVersion = async () => {
    const promptText = window.prompt("추가할 내용을 입력하세요.");

    if (promptText !== null) {
      const { data, error } = await VERSION_REST_API.create({
        version: promptText,
        categoryName: categoryName,
      });
      if (data) {
        const newVersion = data;
        console.log(newVersion);
        setCategoryList(prev => [...prev, newVersion]);
      }
    }
  };

  const deleteVersion = async categoryIndex => {
    const category = categoryList[categoryIndex];
    if (window.confirm("정말 삭제하시겠습니까?")) {
      const { data, response } = await VERSION_REST_API.delete(category.id);
      if (response?.status === 204) {
        setCategoryList(prev => {
          return prev.filter((_, index) => index !== categoryIndex);
        });
      }
    }
  };

  const editVersion = async index => {
    const category = categoryList[index];
    const origversion = category.version;
    const promptText = window.prompt("수정할 내용을 입력하세요.", origversion);

    if (promptText !== null && promptText !== origversion) {
      const { data, error } = await VERSION_REST_API.update(category.id,  {
        version: promptText,
        categoryName: categoryName,
      });

      if (data) {
        setCategoryList(
          produce(draftCategoryList => {
            draftCategoryList[index] = data;
          })
        );
      }
    }
  };

  return (
    <Container className="mt-4 p-0">
      <Card>
        <CategoryHeader title={`${categoryName} - ${titleSuffix}`} />
        <ListGroup variant="flush">
          {categoryList.map((category, index) => (
            <CategoryItem
              key={category.id}
              index={index}
              category={category}
              onClick={() => handleClick(category.version)}
              isManager={isManager}
              deleteVersion={deleteVersion} // deleteVersion 함수 전달
              editVersion={editVersion}
            />
          ))}
        </ListGroup>
        {isManager && (
          <ListGroup.Item
            className="text-center mt-2 mb-2 fw-bold"
            onClick={() => addVersion()}
            variant="outline-primary"
          >
            추가
          </ListGroup.Item>
        )}
      </Card>
    </Container>
  );
}

export default CommonCategoryList;
