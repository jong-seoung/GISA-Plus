# Gisa_Plus 서비스 소개

Gisa_Plus는 기술기사 자격증 문제를 다루는 플랫폼입니다. 사용자들은 필기 기출 문제, 실기 복원 문제, 그리고 데일리 문제를 선택하여 풀이할 수 있습니다. 틀린 문제는 저장해두고, 추후 다시 풀어볼 수 있는 기능을 제공합니다. 또한, 정답의 순서를 랜덤하게 배치하여 문제 풀이의 효율성을 높였습니다. Gisa_Plus는 기존 사이트들과 차별화된 문제 풀이 방식으로 사용자들에게 더욱 효과적인 학습 환경을 제공합니다.

<br/>

## 📌 기능

<details>
  <summary>회원 가입</summary>
  <img src="https://github.com/user-attachments/assets/32848e85-d791-4379-9804-4c9b3152426f" alt="회원 가입 GIF" />
</details>

<details>
  <summary>로그인&로그아웃</summary>
  <img src="https://github.com/user-attachments/assets/f35a8b15-2bcc-45a5-b46e-9d235cb4cd8c" alt="로그인&로그아웃 GIF" />
</details>

<details>
  <summary>로그인이 안되어 있으면 로그인 페이지로 이동</summary>
  <img src="https://github.com/user-attachments/assets/4a4425ae-f51f-41d0-a92f-f1a4f8b21d81" alt="로그인 페이지 이동 GIF" />
</details>

<details>
  <summary>필기 기출 문제 풀이</summary>
  <img src="gisa-backend/mediafiles/gif/필기기출풀이.gif" alt="필기 기출 문제 풀이 GIF" />
</details>

<details>
  <summary>실기 복원 문제 풀이</summary>
  <img src="gisa-backend/mediafiles/gif/실기복원문제.gif" alt="실기 복원 문제 풀이 GIF" />
</details>

<details>
  <summary>데일리 문제 풀이</summary>
  <img src="https://github.com/user-attachments/assets/685ed547-aa5a-42ab-a9e8-64451c2b9d24" alt="데일리 문제 풀이 GIF" />
</details>

<details>
  <summary>문제 저장</summary>
  <img src="https://github.com/user-attachments/assets/919da08b-a932-4491-9df5-e8a3f1efabf4" alt="문제 저장 GIF" />
</details>

<details>
  <summary>Manager Page</summary>
  <img src="https://github.com/user-attachments/assets/b5cf7f50-9939-49a6-a0f7-d29773ceb08e" alt="Manager Page 이미지 1" />
  <img src="https://github.com/user-attachments/assets/548b4011-e5ca-41e3-aa8a-6a0ae78a0f5a" alt="Manager Page 이미지 2" />
  <img src="https://github.com/user-attachments/assets/b3b38061-a42e-4d36-9f34-7c6e67a498dd" alt="Manager Page 이미지 3" />
</details>

<details>
  <summary>결제</summary>
</details>

<br/>

## 사용 기술 스택

| **분야**       | **기술 스택**                           |
| -------------- | --------------------------------------- |
| **프론트엔드** | JavaScript, React, bootstrap, HTML, CSS |
| **백엔드**     | Django, Django Rest Framework           |
| **DB**         | PostgreSQL                              |
| **Infra**      | AWS (Lightsail)                         |
| **API**        | Portone API                             |

<br/>

## 프로젝트 구성도

```
Gisa-Plus/
├── gisa-backend/        # Django, DRF로 서버 및 DB 구축
└── gisa-frontend/       # JavaScript, React 기반 화면단 구축
```

<br/>

## Getting Started

프로젝트의 각 부분에 대한 자세한 설명은 해당 디렉토리의 README.md 파일을 참조하십시오.

- [Back-End 리포지토리](https://github.com/jong-seoung/GISA-Plus/tree/main/gisa-backend)
- [Front-End 리포지토리](https://github.com/jong-seoung/GISA-Plus/tree/main/gisa-frontend)
