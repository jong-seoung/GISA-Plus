import { useState, useEffect } from "react";
import { useApiAxios } from "../../api";
import { useParams } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Button,
  Card,
  InputGroup,
  Form,
} from "react-bootstrap";

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
              <Card.Body key={index}>
                <Row className="align-items-center">
                  <Col xs={1} />
                  <Col xs={10}>
                    <Row className="mt-4">
                      <Col className="text-left fw-bold h4">
                        <p>{restoreItem.title}</p>
                      </Col>

                      <Row className="text-center">
                        {restoreItem.image_list &&
                        restoreItem.image_list.length > 0 ? (
                          <img
                            src={restoreItem.image_list[0].image}
                            alt="퀴즈 이미지"
                            style={{ width: "90%", height: "auto" }}
                            className="mx-auto d-block"
                          />
                        ) : (
                          <p></p>
                        )}
                      </Row>

                      {restoreItem.answer && restoreItem.answer.length > 0 ? (
                        restoreItem.answer.map((answerItem, idx) => (
                          <Row className="fw-bold h5 mb-1" key={idx}>
                            <div>{restoreItem.content}</div>
                            <ol className="p-3 ms-4 fw-normal">
                              <li>
                                <small>
                                  {showAnswers[`${index}-${idx}`]
                                    ? answerItem.name
                                    : ""}
                                </small>
                              </li>
                            </ol>

                            <Row className="mb-2">
                              <InputGroup>
                                <InputGroup.Text>메모</InputGroup.Text>
                                <Form.Control
                                  as="textarea"
                                  aria-label="메모 영역"
                                />
                              </InputGroup>
                            </Row>

                            <Row
                              key={restoreItem.id}
                              className="text-center mt-3"
                            >
                              {showAnswers[`${index}-${idx}`] ? (
                                <Button className="invisible">""</Button>
                              ) : (
                                <Button
                                  variant="success"
                                  onClick={() => handleShowAnswers(index, idx)}
                                >
                                  정답 보기
                                </Button>
                              )}
                            </Row>
                          </Row>
                        ))
                      ) : (
                        <li>
                          <small>
                            정답이 지정되지 않았습니다. 문의 부탁드립니다.
                          </small>
                        </li>
                      )}
                    </Row>
                  </Col>
                  <Col xs={1} />
                </Row>
              </Card.Body>
            ))}
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Dailyrestore;
