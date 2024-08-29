import { useState, useEffect } from "react";
import { useApiAxios } from "../../api";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Card } from "react-bootstrap";
import RestoreCard from "../../components/practical/RestoreCard";

function Dailyrestore() {
  const { categoryName, version } = useParams();
  const [{ data: origRestore = undefined, loading }] = useApiAxios(
    `restore/api/restore/${categoryName}/${version}`
  );

  const [restore, setRestore] = useState([]);
  const [showAnswers, setShowAnswers] = useState({});

  useEffect(() => {
    setRestore(origRestore || []);
  }, [origRestore]);

  const handleShowAnswers = (index, idx) => {
    setShowAnswers(prevState => ({
      ...prevState,
      [`${index}-${idx}`]: true,
    }));
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
              />
            ))}
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Dailyrestore;
