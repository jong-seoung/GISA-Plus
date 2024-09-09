import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { makeRestApi, useApiAxios } from "../../api";
import {
  ListGroup,
  Button,
  Container,
  Card,
  Accordion,
  Form,
  Modal,
} from "react-bootstrap";
import CategoryHeader from "../../components/wp/CategoryHeader";

const CategoryList = () => {
  const { categoryName } = useParams();
  const navigate = useNavigate();
  const [{ data: origCategory = undefined, loading }, refetch] =
    useApiAxios(`quiz/api/category/`);
  const CATEGORY_REST_API = makeRestApi(`/quiz/api/category/`);
  const UNIT_REST_API = makeRestApi(`/quiz/api/unit/`);
  const [category, setCategory] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newUnitName, setNewUnitName] = useState("");
  const [editingUnit, setEditingUnit] = useState(null);
  const [showUnitModal, setShowUnitModal] = useState(false);
  const [activeKey, setActiveKey] = useState(null); // 아코디언 열림 상태 관리
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [ToDelete, setToDelete] = useState(null);
  const [DeleteType, setDeleteType] = useState(null);
  const [userInput, setUserInput] = useState(""); // 사용자의 입력 저장
  const [errorMessage, setErrorMessage] = useState(""); // 에러 메시지 저장

  const handleDeleteClick = (item, type) => {
    setToDelete(item);
    setDeleteType(type);
    setShowDeleteModal(true); // 모달 열기
  };

  const handleConfirmDelete = async () => {
    if (ToDelete) {
      console.log(DeleteType, 123);
      if (DeleteType === "category") {
        if (userInput.toLowerCase() === ToDelete.version) {
          console.log("category");
          const { data, response } = await CATEGORY_REST_API.delete(
            ToDelete.id
          );
          if (response?.status === 204) {
            refetch();
          }
        } else {
          return setErrorMessage("삭제를 진행하려면 올바른 값을 입력해주세요.");
        }
      } else if (DeleteType === "unit") {
        console.log(ToDelete.name);
        if (userInput.toLowerCase() === ToDelete.name) {
          console.log("unit");
          const { data, response } = await UNIT_REST_API.delete(ToDelete.id);
          if (response?.status === 204) {
            refetch();
          }
        } else {
          return setErrorMessage("삭제를 진행하려면 올바른 값을 입력해주세요.");
        }
      }
    }

    setShowDeleteModal(false); // 모달 닫기
    setToDelete(null);
    setUserInput(""); // 입력 초기화
    setErrorMessage("");
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false); // 모달 닫기
    setToDelete(null);
  };

  useEffect(() => {
    setCategory(origCategory || []);
  }, [origCategory]);

  // 연도 선택 처리
  const handleCategorySelect = categoryId => {
    console.log("선택된 연도 ID:", categoryId);
  };

  // 유닛 클릭 시 페이지 이동 처리
  const handleUnitClick = unitName => {
    navigate(`/${categoryName}/${unitName}`);
  };

  const handleEditCategory = categoryItem => {
    setCurrentCategory(categoryItem);
    setNewCategoryName(categoryItem.version);
    setShowModal(true);
  };

  // 연도 저장 처리
  const handleSaveCategory = async () => {
    if (currentCategory) {
      const { data, error } = await CATEGORY_REST_API.update(
        currentCategory.id,
        {
          version: newCategoryName,
        }
      );
      if (data) {
        refetch();
      }
    } else {
      console.log(currentCategory);
      const { data, error } = await CATEGORY_REST_API.create({
        category_name: `${categoryName}`,
        version: newCategoryName,
      });
      if (data) {
        refetch();
      }
    }
    setShowModal(false);
  };

  // 유닛 수정 버튼 클릭 시
  const handleEditUnit = unitItem => {
    setEditingUnit(unitItem);
    setNewUnitName(unitItem.name);
    setShowUnitModal(true);
  };

  // 유닛 저장 처리
  const handleSaveUnit = async categoryItem => {
    if (editingUnit) {
      const { data, error } = await UNIT_REST_API.update(editingUnit.id, {
        name: newUnitName,
      });
      if (data) {
        refetch();
      }
    } else {
      const { data, error } = await UNIT_REST_API.create({
        category: categoryItem.id,
        name: newUnitName,
      });
      if (data) {
        refetch();
      }
    }
    setNewUnitName("");
    setShowUnitModal(false);
  };

  return (
    <Container className="mt-4 p-0">
      <Card className="rounded-3 shadow-sm">
        <CategoryHeader title={`${categoryName} - QuizManager`} />
        <ListGroup variant="flush">
          {category.map((categoryItem, index) => (
            <div key={index} className="border-0">
              {/* div를 사용하여 아코디언 동작 수동 처리 */}
              <div
                className="rounded-3 p-3 d-flex justify-content-between align-items-center"
                style={{
                  cursor: "pointer",
                  backgroundColor: activeKey === index ? "#f1f1f1" : "white",
                }}
                onClick={() => setActiveKey(activeKey === index ? null : index)}
              >
                <span className="fw-bold">{categoryItem.version}</span>
                <div>
                  <Button
                    variant="outline-success"
                    size="sm"
                    className="me-2"
                    onClick={() => handleEditCategory(categoryItem)}
                  >
                    수정
                  </Button>
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => handleDeleteClick(categoryItem, "category")}
                  >
                    삭제
                  </Button>
                </div>
              </div>
              {/* 아코디언 내용 */}
              {activeKey === index && (
                <div className="bg-light p-3">
                  {categoryItem.unit.length > 0 && (
                    <div className="mb-0">
                      {categoryItem.unit.map((unitItem, index) => (
                        <div
                          key={index}
                          className="d-flex justify-content-between align-items-center p-2 border-bottom"
                        >
                          <span
                            style={{ cursor: "pointer" }}
                            onClick={() => handleUnitClick(unitItem.name)}
                          >
                            {unitItem.name}
                          </span>
                          <div>
                            <Button
                              variant="outline-primary"
                              size="sm"
                              className="me-2"
                              onClick={() => handleEditUnit(unitItem)}
                            >
                              수정
                            </Button>
                            <Button
                              variant="outline-danger"
                              size="sm"
                              onClick={() =>
                                handleDeleteClick(unitItem, "unit")
                              }
                            >
                              삭제
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  {/* 유닛 추가 */}
                  <Form
                    className="d-flex mt-2"
                    onSubmit={e => {
                      e.preventDefault();
                      handleSaveUnit(categoryItem);
                    }}
                  >
                    <Form.Control
                      type="text"
                      placeholder="단원을 추가해주세요."
                      className="me-2"
                      value={newUnitName}
                      onChange={e => setNewUnitName(e.target.value)}
                    />
                  </Form>
                </div>
              )}
            </div>
          ))}
        </ListGroup>
        <ListGroup.Item
          className="text-center mt-2 mb-2 fw-bold rounded-3"
          style={{ cursor: "pointer" }}
          onClick={() => {
            setNewCategoryName("");
            setCurrentCategory(null);
            setShowModal(true);
          }}
        >
          연도 추가
        </ListGroup.Item>
      </Card>

      {/* 연도 수정/추가 모달 */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            {currentCategory ? "연도 수정" : "연도 추가"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="formCategoryName">
            <Form.Label>연도</Form.Label>
            <Form.Control
              type="text"
              placeholder="연도를 입력해주세요."
              value={newCategoryName}
              onChange={e => setNewCategoryName(e.target.value)}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            취소
          </Button>
          <Button variant="primary" onClick={handleSaveCategory}>
            저장
          </Button>
        </Modal.Footer>
      </Modal>

      {/* 유닛 수정/추가 모달 */}
      <Modal show={showUnitModal} onHide={() => setShowUnitModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{editingUnit ? "유닛 수정" : "유닛 추가"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="formUnitName">
            <Form.Label>유닛 이름</Form.Label>
            <Form.Control
              type="text"
              placeholder="유닛 이름을 입력해주세요."
              value={newUnitName}
              onChange={e => setNewUnitName(e.target.value)}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowUnitModal(false)}>
            취소
          </Button>
          <Button variant="primary" onClick={handleSaveUnit}>
            저장
          </Button>
        </Modal.Footer>
      </Modal>
      {/* 삭제 확인 모달 */}
      <Modal show={showDeleteModal} onHide={handleCancelDelete}>
        <Modal.Header closeButton>
          <Modal.Title>삭제 확인</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          삭제를 원하시면 '
          {ToDelete
            ? DeleteType === "category"
              ? ToDelete.version
              : ToDelete.name
            : "없음"}
          '를 입력해주세요.
          <br />
          <span style={{ color: "red" }}>관련된 모든 문제들이 제거됩니다.</span>
          <Form.Group className="mt-3">
            <Form.Control
              type="text"
              placeholder={`${
                ToDelete
                  ? DeleteType === "category"
                    ? ToDelete.version
                    : ToDelete.name
                  : "없음"
              }`}
              value={userInput}
              onChange={e => setUserInput(e.target.value)} // 입력값 저장
            />
          </Form.Group>
          {errorMessage && (
            <p className="text-danger mt-2">{errorMessage}</p> // 에러 메시지 출력
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCancelDelete}>
            취소
          </Button>
          <Button variant="danger" onClick={handleConfirmDelete}>
            네
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default CategoryList;
