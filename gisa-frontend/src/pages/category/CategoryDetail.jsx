import { NavLink, useParams } from "react-router-dom";

import React from "react";
import { Container, Card, Row, Col, Button } from "react-bootstrap";

function CategoryDetail() {
  const { categoryName } = useParams(); // URL 경로에서 categoryName을 가져옴

  return (
    <Container className="mt-4">
      <h1>{categoryName}</h1> {/* 카테고리 이름을 출력 */}
      <p>이 페이지는 {categoryName}에 대한 상세 정보입니다.</p>
      <Row className="mt-4">
        {/* 이론 섹션 */}
        <Col md={3}>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title> 필기 기출</Card.Title>
              <Card.Text>필기 기출문제들을 풀어보세요.</Card.Text>
              <NavLink to="problem">
                <Button variant="primary">기출 문제 보기</Button>
              </NavLink>
            </Card.Body>
          </Card>
        </Col>

        {/* 기출문제 섹션 */}
        <Col md={3}>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>실기 복원</Card.Title>
              <Card.Text>실기 복원 문제들을 풀어보세요.</Card.Text>
              <NavLink to="실기">
                <Button variant="primary">복원 문제 보기</Button>
              </NavLink>
            </Card.Body>
          </Card>
        </Col>

        {/* 데일리 문제 섹션 */}
        <Col md={3}>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>데일리 문제</Card.Title>
              <Card.Text>매일 새로운 문제로 실력을 쌓으세요.</Card.Text>
              <NavLink to="daily">
                <Button variant="primary">데일리 문제 풀기</Button>
              </NavLink>
            </Card.Body>
          </Card>
        </Col>

        {/* 저장 섹션 */}
        <Col md={3}>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>오답 노트</Card.Title>
              <Card.Text>틀렸던 문제를 저장하고 다시 풀어보세요</Card.Text>
              <NavLink to="save">
                <Button variant="primary">저장된 문제 풀기</Button>
              </NavLink>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default CategoryDetail;
