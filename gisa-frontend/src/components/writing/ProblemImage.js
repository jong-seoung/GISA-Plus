import React from "react";

const ProblemImage = ({ imageState, problemIndex }) => {
  if (imageState === undefined || Object.keys(imageState).length === 0) {
    return null;
  }

  const imageUrl = "http://localhost:8000/media/problem/correct/correct.png";
  const isCorrect = imageState === "true";
  const imgAlt = isCorrect ? "정답 이미지" : "오답 이미지"
  const clipPath = isCorrect ? "inset(0 50% 0 0)" : "inset(0 0 0 50%)";
  const leftPosition = isCorrect ? "-10px" : "-90px";

  return (
    <img
      src={imageUrl}
      draggable="false"
      alt={imgAlt}
      style={{
        position: "absolute",
        top: -25,
        left: leftPosition,
        zIndex: 0,
        width: "30%",
        clipPath: clipPath,
      }}
    />
  );
};

export default ProblemImage;
