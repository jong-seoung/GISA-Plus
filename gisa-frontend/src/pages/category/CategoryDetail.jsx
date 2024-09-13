import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
import SectionCard from "../../components/gisa/SectionCard";

function CategoryDetail() {
  const { categoryName } = useParams(); // URL 경로에서 categoryName을 가져옴

  return (
    <Container className="mt-4">
      <h1>{categoryName}</h1> {/* 카테고리 이름을 출력 */}
      <p>이 페이지는 {categoryName}에 대한 상세 정보입니다.</p>
      <Row className="mt-4">
        <Col md={3}>
          <SectionCard
            title="필기 기출"
            text="필기 기출문제들을 풀어보세요."
            link="problem"
            buttonText="기출 문제 보기"
            variant="outline-primary"
          />
        </Col>
        <Col md={3}>
          <SectionCard
            title="실기 복원"
            text="실기 복원 문제들을 풀어보세요."
            link="실기"
            buttonText="복원 문제 보기"
            variant="outline-primary"
          />
        </Col>
        <Col md={3}>
          <SectionCard
            title="데일리 문제"
            text="매일 새로운 문제로 실력을 쌓으세요."
            link="daily"
            buttonText="데일리 문제 풀기"
            variant="outline-primary"
          />
        </Col>
        <Col md={3}>
          <SectionCard
            title="오답 노트"
            text="틀렸던 문제를 저장하고 다시 풀어보세요."
            link="save"
            buttonText="저장된 문제 풀기"
            variant="outline-primary"
          />
        </Col>
      </Row>
    </Container>
  );
}

export default CategoryDetail;
