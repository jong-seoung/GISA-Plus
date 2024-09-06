import React from "react";
import { Row } from "react-bootstrap";

const QuizImage = ({ restoreItem }) => (
  <Row className="text-center">
    {restoreItem.image_list ? (
      restoreItem.image_list.map((imageItem, index) => (
        <img
          key={index}
          src={imageItem.image}
          alt={`이미지 ${index}`}
          style={{
            width: "100%",
            height: "auto",
          }}
        />
      ))
    ) : (
      <p></p>
    )}
  </Row>
);

export default QuizImage;
