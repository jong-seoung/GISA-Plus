import React from "react";
import { Col, Button } from "react-bootstrap";
import styles from "./Button.module.css"; // 모듈 CSS 임포트

const NextButton = ({ nextQuizUrl, handleNextPage }) => (
  nextQuizUrl ? (
    <Col xs={1} onClick={handleNextPage}>
      <Button className={styles.noBackground} variant="link">
        <i className={`${styles.arrow} ${styles.left}`} role="img"></i>
      </Button>
    </Col>
  ) : (
    <Col xs={1}></Col>
  )
);

export default NextButton;
