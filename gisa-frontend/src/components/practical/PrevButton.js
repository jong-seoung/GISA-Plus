import React from "react";
import { Col, Button } from "react-bootstrap";
import styles from "./Button.module.css"; // 모듈 CSS 임포트

const PrevButton = ({ prevQuizUrl, handlePrevPage }) => (
  prevQuizUrl ? (
    <Col xs={1} onClick={handlePrevPage}>
      <Button className={styles.noBackground} variant="link">
        <i className={`${styles.arrow}`} role="img"></i>
      </Button>
    </Col>
  ) : (
    <Col xs={1}></Col>
  )
);

export default PrevButton;
