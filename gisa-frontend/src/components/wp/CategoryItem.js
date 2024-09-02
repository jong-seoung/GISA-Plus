import React from "react";
import { ListGroup, Button } from "react-bootstrap";

const DONE_STYLE = { textDecoration: "line-through" };

const CategoryItem = ({ category, onClick, isManager }) => (
  <ListGroup.Item className="d-flex justify-content-between align-items-start">
    <div
      style={{
        cursor: "pointer",
        ...(category.done ? DONE_STYLE : null),
      }}
      onClick={onClick}
    >
      {category.version}
    </div>
    
    {/* 관리자일 경우 추가/수정/삭제 버튼 추가 */}
    {isManager && (
      <div>
        <Button
          variant="outline-secondary"
          size="sm"
          className="me-2"
          onClick={(e) => {
            e.stopPropagation(); // 부모 div의 onClick이 실행되지 않도록 함
            console.log(`수정 클릭됨: ${category.version}`);
            // 수정 버튼 클릭 시 로직 추가
          }}
        >
          수정
        </Button>
        <Button
          variant="outline-danger"
          size="sm"
          onClick={(e) => {
            e.stopPropagation(); // 부모 div의 onClick이 실행되지 않도록 함
            console.log(`삭제 클릭됨: ${category.version}`);
            // 삭제 버튼 클릭 시 로직 추가
          }}
        >
          삭제
        </Button>
      </div>
    )}

  </ListGroup.Item>
);

export default CategoryItem;
