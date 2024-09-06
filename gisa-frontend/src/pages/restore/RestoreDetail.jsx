import { useState, useEffect } from "react";
import { useApiAxios, makeRestApi } from "../../api";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useStatusContext } from "../../contexts/StatusContext";
import RestoreCard from "../../components/practical/RestoreCard";
import RestoreInputModal from "../../components/practical/RestoreInputModal"

function Dailyrestore() {
  const { categoryName, version } = useParams();
  const [{ data: origRestore = undefined, loading }] = useApiAxios(
    `restore/api/restore/?categoryName=${categoryName}&version=${version}`
  );
  const PROBLEM_REST_API = makeRestApi(`/restore/api/restore/`);

  const [restore, setRestore] = useState([]);
  const [showAnswers, setShowAnswers] = useState({});
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedRestore, setSelectedRestore] = useState(null);
  const { managed = [undefined] } = useStatusContext();

  const isManager = managed.includes(categoryName);

  useEffect(() => {
    setRestore(origRestore || []);
  }, [origRestore]);

  const handleShowAnswers = (index) => {
    setShowAnswers(prevState => ({
      ...prevState,
      [`${index}`]: true,
    }));
  };

  const handleEdit = restoreIndex => {
    setSelectedRestore(restore[restoreIndex]);
    setShowEditModal(true);
  };

  const handleAdd = () => {
    setSelectedRestore(null);
    setShowEditModal(true);
  };

  const handleEditChange = (field, value) => {
    setSelectedRestore(prev => ({ ...prev, [field]: value }));
  };

  const handleDelete = async restoreIndex => {
    const restoreToDelete = restore[restoreIndex];
    if (window.confirm(`'${restoreToDelete.title}'를 삭제하시겠습니까?`)) {
      const { data, response } = await PROBLEM_REST_API.delete(
        restoreToDelete.id
      );
      if (response?.status === 204) {
        setRestore(prev => {
          return prev.filter((_, index) => index !== restoreIndex);
        });
      }
    }
  };

  const handleSubmit = async (newRestore, isEditMode) => {
    const formData = new FormData();

    formData.append("num", newRestore.num);
    formData.append("title", newRestore.title);
    formData.append("content", newRestore.content);
    formData.append("version", newRestore.version);
    formData.append("categoryName", newRestore.categoryName);

    newRestore.answer.forEach((item, index) => {
      formData.append(`answer[${index}]num`, item.num);
      formData.append(`answer[${index}]name`, item.name);
    });

    if (newRestore.remove_image && newRestore.remove_image.length > 0) {
      newRestore.remove_image.forEach((item, index) => {
        formData.append(`remove_image`, item);
      });
    }

    if (newRestore.image_list && newRestore.image_list.length > 0) {
      newRestore.image_list.forEach(file => {
        if (file.isNew) {
          formData.append("images", file.image); // 새로 추가된 이미지만 추가
        }
      });
    }

    try {
      let response;
      if (isEditMode) {
        console.log("수정:", newRestore);
        response = await PROBLEM_REST_API.update(newRestore.id, formData);
      } else {
        console.log("생성:", newRestore);
        response = await PROBLEM_REST_API.create(formData);
      }

      if (response.data) {
        setShowEditModal(false);
        window.location.reload();
      }
    } catch (error) {
      console.error("문제 전송 중 오류 발생:", error);
    }
  };

  if (loading || !restore) {
    return <p>Loading...</p>;
  }

  return (
    <Container className="mt-4">
      <div className="text-center mb-3">
        <h2>
          {version} {categoryName} 실기
        </h2>
      </div>
      <Row className="justify-content-center">
        <Col md={12} className="p-0">
          <Card className="mb-4">
            {restore.map((restoreItem, index) => (
              <RestoreCard
                key={index}
                restoreItem={restoreItem}
                index={index}
                showAnswers={showAnswers}
                handleShowAnswers={handleShowAnswers}
                isManager={isManager}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
              />
            ))}
            {isManager && (
              <>
                <Button
                  className="text-center mt-2 fw-bold"
                  onClick={() => handleAdd()}
                >
                  추가
                </Button>
              </>
            )}
          </Card>
          <RestoreInputModal
            show={showEditModal}
            onHide={() => setShowEditModal(false)}
            selectedRestore={selectedRestore}
            handleEditChange={handleEditChange}
            handleSubmit={handleSubmit}
            isEditMode={!!selectedRestore}
            categoryName={categoryName}
            version={version}
          />
        </Col>
      </Row>
    </Container>
  );
}

export default Dailyrestore;
