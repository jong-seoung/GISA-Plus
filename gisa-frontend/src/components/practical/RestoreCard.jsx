import React from "react";
import { Card, Row, Col } from "react-bootstrap";
import RestoreTitle from "../wp/NumTitle";
import RestoreImage from "./Image";
import RestoreAnswer from "./RestoreAnswer";
import Restorecontent from "./RestoreContent";
import EditButtons from "../button/EditButton";
import DeleteButtons from "../button/DeleteButton";

const RestoreCard = ({
  restoreItem,
  index,
  showAnswers,
  handleShowAnswers,
  isManager,
  handleEdit,
  handleDelete,
}) => (
  <Card.Body>
    <Row className="align-items-center mb-5">
      <Col xs={1} />
      <Col xs={10}>
        <Row>
          <Col className="m-3">
            <RestoreTitle num={restoreItem.num} title={restoreItem.title} />

            {isManager && (
              <>
                <EditButtons onEdit={() => handleEdit(index)} />
                <DeleteButtons onDelete={() => handleDelete(index)} />
              </>
            )}
          </Col>

          <RestoreImage restoreItem={restoreItem} />

          <Restorecontent content={restoreItem.content} />

          {restoreItem.answer && restoreItem.answer.length > 0 ? (
            <RestoreAnswer
              key={index}
              restoreItem={restoreItem}
              showAnswer={showAnswers[`${index}`]}
              handleShowAnswer={handleShowAnswers}
              index={index}
            />
          ) : (
            <li>
              <small>정답이 지정되지 않았습니다. 문의 부탁드립니다.</small>
            </li>
          )}
        </Row>
      </Col>
      <Col xs={1} />
    </Row>
  </Card.Body>
);

export default RestoreCard;
