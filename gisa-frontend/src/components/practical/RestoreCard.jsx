import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import RestoreTitle from '../wp/NumTitle';
import RestoreImage from './Image';
import RestoreAnswer from './RestoreAnswer';

const RestoreCard = ({
  restoreItem,
  index,
  showAnswers,
  handleShowAnswers
}) => (
  <Card.Body>
    <Row className="align-items-center">
      <Col xs={1} />
      <Col xs={10}>
        <Row className="mt-4">
          <RestoreTitle num={restoreItem.num} title={restoreItem.title} />

          <RestoreImage
            imageUrl={
              restoreItem.image_list && restoreItem.image_list.length > 0
                ? restoreItem.image_list[0].image
                : null
            }
          />

          {restoreItem.answer && restoreItem.answer.length > 0 ? (
            restoreItem.answer.map((answerItem, idx) => (
              <RestoreAnswer
                key={idx}
                answerItem={answerItem}
                showAnswer={showAnswers[`${index}-${idx}`]}
                handleShowAnswer={handleShowAnswers}
                index={index}
                idx={idx}
              />
            ))
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
