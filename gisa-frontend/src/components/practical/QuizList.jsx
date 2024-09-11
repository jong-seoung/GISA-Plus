import React, { useState, useEffect, useCallback } from "react";
import {
  Accordion,
  Container,
  Form,
  Dropdown,
  ButtonGroup,
  Card,
  Button,
} from "react-bootstrap";
import { useApiAxios, makeRestApi } from "../../api";
import { useParams } from "react-router-dom";
import EditButtons from "../../components/button/EditButton";
import DeleteButtons from "../../components/button/DeleteButton";
import _ from "lodash";
import QuizInputModal from "./QuizInputModal";

const QuizList = ({ category }) => {
  const { categoryName } = useParams();

  // States for quiz list and filtering
  const [quizList, setQuizList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(""); // 디바운스된 검색어
  const [versionFilter, setVersionFilter] = useState("");
  const [unitFilter, setUnitFilter] = useState("");
  const [units, setUnits] = useState([]);
  const [nextPageUrl, setNextPageUrl] = useState(null); // 다음 페이지 URL
  const [prevPageUrl, setPrevPageUrl] = useState(null); // 이전 페이지 URL

  // crud
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  // API에서 데이터를 가져오기 위한 axios 훅
  const [{ data: origQuizList = undefined, loading }, refetch] = useApiAxios({
    url: `quiz/api/quiz/?categoryName=${categoryName}`,
  });
  const Quiz_REST_API = makeRestApi(`/quiz/api/quiz/`);
  // 기존 데이터가 있을 경우 처리
  useEffect(() => {
    if (origQuizList) {
      setQuizList(origQuizList.results || []);
      setNextPageUrl(origQuizList.next); // 다음 페이지 URL 저장
      setPrevPageUrl(origQuizList.previous); // 이전 페이지 URL 저장
    }
  }, [origQuizList]);

  // 버전 선택 시 유닛 목록 업데이트
  const handleVersionFilter = selectedVersion => {
    if (selectedVersion === "") {
      setVersionFilter("");
      setUnitFilter("");
      setUnits([]);
    } else {
      setVersionFilter(selectedVersion.version);
      setUnitFilter("");

      if (selectedVersion.unit && selectedVersion.unit.length > 0) {
        setUnits(selectedVersion.unit);
      } else {
        setUnits([]);
      }
    }
  };

  const handleUnitFilter = unitItem => {
    if (unitItem === "") {
      setUnitFilter("");
    } else {
      setUnitFilter(unitItem.name);
    }
  };

  // 검색어가 변경될 때 디바운스를 적용하여 일정 시간 이후에 API 호출
  const debouncedSearch = useCallback(
    _.debounce(value => {
      setDebouncedSearchTerm(value); // 디바운스된 검색어 업데이트
    }, 500), // 500ms 동안 입력이 없을 때 실행
    []
  );

  // 사용자가 입력할 때마다 디바운스된 함수 호출
  useEffect(() => {
    debouncedSearch(searchTerm);
  }, [searchTerm, debouncedSearch]);

  // 필터 또는 디바운스된 검색어 변경 시 새로운 API 호출
  useEffect(() => {
    const fetchData = async () => {
      try {
        setQuizList([]); // 이전 결과를 초기화
        const response = await refetch({
          url: `quiz/api/quiz/?unit__category__main_category__name=${categoryName}&unit__category__version=${versionFilter}&unit__name=${unitFilter}&search=${debouncedSearchTerm}`,
        });
        setQuizList(response.data.results || []);
        setNextPageUrl(response.data.next); // 다음 페이지 URL 저장
        setPrevPageUrl(response.data.previous); // 이전 페이지 URL 저장
      } catch (error) {
        // CanceledError만 무시
        if (error.code !== "ERR_CANCELED") {
          console.error(error); // 다른 오류는 처리
        }
      }
    };

    fetchData();
  }, [versionFilter, unitFilter, debouncedSearchTerm, categoryName, refetch]);

  // 다음 페이지 로드
  const loadNextPage = async () => {
    if (nextPageUrl) {
      try {
        const response = await refetch({ url: nextPageUrl });
        setQuizList(response.data.results || []);
        setNextPageUrl(response.data.next); // 다음 페이지 URL 갱신
        setPrevPageUrl(response.data.previous); // 이전 페이지 URL 갱신
      } catch (error) {
        console.error(error);
      }
    }
  };

  // 이전 페이지 로드
  const loadPrevPage = async () => {
    if (prevPageUrl) {
      try {
        const response = await refetch({ url: prevPageUrl });
        setQuizList(response.data.results || []);
        setNextPageUrl(response.data.next); // 다음 페이지 URL 갱신
        setPrevPageUrl(response.data.previous); // 이전 페이지 URL 갱신
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleAdd = () => {
    setSelectedQuiz(null);
    setShowEditModal(true);
  };

  const handleEdit = async (quiz) => {
    console.log(quiz.id);
    const { data } = await Quiz_REST_API.detail(quiz.id);
    console.log(data);
    setSelectedQuiz(data);
    setShowEditModal(true);
  };

  const handleDelete = async quiz => {
    const QuizToDelete = quiz;
    if (window.confirm(`'${QuizToDelete.title}'를 삭제하시겠습니까?`)) {
      const { data, response } = await Quiz_REST_API.delete(QuizToDelete.id);
      if (response?.status === 204) {
        console.log("삭제 완료");
      }
    }
  };

  const handleEditChange = (field, value) => {
    setSelectedQuiz(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (newQuiz, isEditMode) => {
    const formData = new FormData();
    formData.append("title", newQuiz.title);
    formData.append("content", newQuiz.content);
    formData.append("version", newQuiz.version);
    formData.append("categoryName", newQuiz.categoryName);
    formData.append("unit_name", newQuiz.unit);

    newQuiz.answer.forEach((item, index) => {
      formData.append(`answer[${index}]num`, item.num);
      formData.append(`answer[${index}]name`, item.name);
    });

    if (newQuiz.remove_image && newQuiz.remove_image.length > 0) {
      newQuiz.remove_image.forEach((item, index) => {
        console.log(newQuiz.remove_image);
        formData.append(`remove_image`, item);
      });
    }

    if (newQuiz.image_list && newQuiz.image_list.length > 0) {
      newQuiz.image_list.forEach(file => {
        if (file.isNew) {
          formData.append("images", file.image);
        }
      });
    }

    try {
      let response;
      if (isEditMode) {
        console.log("newQuiz:", newQuiz);
        response = await Quiz_REST_API.update(newQuiz.id, formData);
      } else {
        response = await Quiz_REST_API.create(formData);
      }

      if (response.data) {
        console.log(response.data);
        setShowEditModal(false);
        window.location.reload();
      }
    } catch (error) {
      console.error("문제 전송 중 오류 발생:", error);
    }
  };

  return (
    <Container className="mt-4 p-0">
      <Card className="rounded-3 shadow-sm">
        <Card.Header>
          <h3>전체 문제</h3>
        </Card.Header>
        <Card.Body>
          {/* 검색 입력 필드 */}
          <Form.Control
            type="text"
            placeholder="Search quizzes..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)} // 검색어 변경 시 상태 업데이트
            className="mb-3"
          />

          {/* 버전 필터링 및 유닛 필터링 드롭다운 */}
          <div className="d-flex justify-content-end mb-3">
            <Dropdown as={ButtonGroup} className="me-3">
              <Dropdown.Toggle variant="outline-primary">
                {versionFilter === "" ? "All Versions" : versionFilter}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => handleVersionFilter("")}>
                  All Versions
                </Dropdown.Item>
                {category.map((categoryItem, index) => (
                  <Dropdown.Item
                    key={index}
                    onClick={() => handleVersionFilter(categoryItem)}
                  >
                    {categoryItem.version}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>

            <Dropdown as={ButtonGroup}>
              <Dropdown.Toggle variant="outline-primary">
                {unitFilter === "" ? "All Units" : unitFilter}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => handleUnitFilter("")}>
                  All Units
                </Dropdown.Item>
                {units.length > 0 ? (
                  units.map((unitItem, index) => (
                    <Dropdown.Item
                      key={index}
                      onClick={() => handleUnitFilter(unitItem)}
                    >
                      {unitItem.name}
                    </Dropdown.Item>
                  ))
                ) : (
                  <Dropdown.Item disabled>No Units Available</Dropdown.Item>
                )}
              </Dropdown.Menu>
            </Dropdown>
          </div>

          {/* 아코디언으로 목록 표시 */}
          <Accordion>
            {quizList.length > 0 ? (
              quizList.map((item, index) => (
                <Accordion.Item eventKey={index.toString()} key={index}>
                  <Accordion.Header>{item.title}</Accordion.Header>
                  <Accordion.Body>
                    {item.content}
                    <br />
                    <Button
                      variant="outline-success"
                      size="sm"
                      className="me-2"
                      onClick={() => handleAdd()}
                    >
                      추가
                    </Button>
                    <EditButtons onEdit={() => handleEdit(item)} />
                    <DeleteButtons onDelete={() => handleDelete(item)} />
                  </Accordion.Body>
                </Accordion.Item>
              ))
            ) : (
              <Card>
                <Card.Body>No quizzes found</Card.Body>
              </Card>
            )}
          </Accordion>

          {/* 페이지네이션 버튼 중앙 정렬 및 null 시 숨김 */}
          <div className="d-flex justify-content-center mt-4">
            {prevPageUrl && (
              <Button onClick={loadPrevPage} className="me-2">
                Previous
              </Button>
            )}
            {nextPageUrl && (
              <Button onClick={loadNextPage} className="ms-2">
                Next
              </Button>
            )}
          </div>
        </Card.Body>
      </Card>
      <QuizInputModal
        show={showEditModal}
        onHide={() => setShowEditModal(false)}
        selectedQuiz={selectedQuiz}
        handleEditChange={handleEditChange}
        handleSubmit={handleSubmit}
        isEditMode={!!selectedQuiz}
        categoryName={categoryName}
        // version={version}
      />
    </Container>
  );
};

export default QuizList;
