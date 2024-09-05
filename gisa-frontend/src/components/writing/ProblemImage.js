import React from "react";

const ProblemImage = ({ imageState, problemIndex }) => {
  if (imageState === undefined || Object.keys(imageState).length === 0) {
    return null;
  }

  const imageUrl = "http://localhost:8000/media/problem/correct/correct.png";
  const isCorrect = imageState === "true";
  const imgAlt = isCorrect ? "정답 이미지" : "오답 이미지";

  return (
    <div
      style={{
        position: "absolute",
        // left: isCorrect ? "10%" : "70%", // 고정된 위치
        top: "32%", // 부모 컨테이너의 중앙에 배치
        transform: "translateY(-50%) translatex(-30%)", 
        zIndex: 1,
        width: "22%",
        overflow: "hidden", // 넘치는 부분 잘라내기
      }}
    >
      <img
        src={imageUrl}
        draggable="false"
        alt={imgAlt}
        style={{
          width: "200%", // 이미지 자체 크기 조정
          height: "100%", // 높이는 컨테이너에 맞춤
          objectFit: "cover", // 비율 유지
          transform: isCorrect ? "translateX(0)" : "translateX(-50%)", // 이미지 이동
        }}
      />
    </div>
  );
};

export default ProblemImage;
