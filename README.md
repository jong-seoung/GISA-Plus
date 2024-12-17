# Gisa_Plus 서비스 소개

<div align="center">
<img width="340" alt="image" src="https://github.com/user-attachments/assets/f7f0e308-8ae2-4149-9392-cd45868b1dfe">
<br>
Gisa_Plus
</div>

> **프론트 공부용 풀스택 프로젝트** <br/> **개발기간: 2024.08 ~ 2024.09**


**Gisa_Plus**는 기술기사 자격증 문제를 효과적으로 학습할 수 있는 플랫폼입니다. 
</br>
정답의 순서와 문제 순서를 랜덤하게 배치하는 기능을 도입해 기존 사이트와 차별화된 학습 환경을 제공합니다.
</br>
사용자는 다음과 같은 기능을 통해 학습 효율을 높일 수 있습니다.
</br>

- **필기 기출 문제 풀이**
- **실기 복원 문제 풀이**
- **데일리 문제 풀이**
- **틀린 문제 저장 및 복습 기능**

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

## 📊 ERD & Structure

<details>
<summary>ERD</summary>
<div markdown="1" style="padding-left: 15px;">
<img src="https://github.com/user-attachments/assets/5e3e3f04-ab7b-49ed-8955-90300403a648"/>
</div>
</details>

<br />

<details>
<summary>Structure</summary>
<div markdown="1" style="padding-left: 15px;">
<img src="https://github.com/user-attachments/assets/423dc3f3-e810-4fc2-9635-c805dd1b4063" />
</div>
</details>

## 📌 핵심 기능

### 랜덤 문제 출력
[데일리 랜덤 퀴즈](https://github.com/jong-seoung/GISA-Plus/blob/ccabbf5d7aa0f6c094e7193903759ac9b3b65e9d/gisa-backend/quiz/views.py#L52)

> 데일리 문제를 랜덤하게 가져와 사용자에게 출력합니다. </br> 사용자가 새로고침을 하거나 요청을 보낼때마다 문제가 갱신됩니다.

### 보기를 랜덤으로 출력
[랜덤으로 섞인 보기](https://github.com/jong-seoung/GISA-Plus/blob/ccabbf5d7aa0f6c094e7193903759ac9b3b65e9d/gisa-backend/problem/serializers.py#L79)
> 사지선다의 보기를 랜덤으로 사용자에게 보여줍니다. </br> 문제를 여러번 풀다보면 정답 번호를 외우게 되는데, 이러한 현상을 조금이라도 방지하고자 구현하였습니다.

### 기출 문제, 정답 오답 출력, 오답 노트 작성
[오답 노트](https://github.com/jong-seoung/GISA-Plus/blob/ccabbf5d7aa0f6c094e7193903759ac9b3b65e9d/gisa-backend/quiz/views.py#L109)

> 기출문제 목록을 보여주고 정답 체크 시, 정답 오답 정보를 알려줍니다. </br> 저장한 문제에서 이전 문제와 다음 문제로 이동할 수 있도록 ID기반으로 URL을 생성하여 반환합니다.

### 권한 설정, 관리자 
[권한 설정](https://github.com/jong-seoung/GISA-Plus/blob/ccabbf5d7aa0f6c094e7193903759ac9b3b65e9d/gisa-backend/core/permissions.py#L6)
> 권한을 설정하여, 로그인을 안한 사용자는 로그인 페이지로 넘어가고, Manager 권한이 있는 사용자는 관리할 수 있는 버튼을 제공해줍니다. </br> 구독 기능을 위해 결제 여부를 확인하는 권한도 작성하였으나 비활성화 해두었습니다.

### 결제 페이지

[결제 정보 저장](https://github.com/jong-seoung/GISA-Plus/blob/ccabbf5d7aa0f6c094e7193903759ac9b3b65e9d/gisa-backend/payment/views.py#L11) 
</br>
[결제 페이지 구현](https://github.com/jong-seoung/GISA-Plus/blob/ccabbf5d7aa0f6c094e7193903759ac9b3b65e9d/gisa-frontend/src/pages/Payment.jsx)
</br>

> PortOne API를 이용하여 프론트에서 결제 페이지를 구현하고, 결제 완료시 데이터를 전달받아 DB에 저장하는 코드를 작성하였습니다. </br> 추후 업데이트를 목적으로 작성하였으며, 초기에는 비활성화 해두었습니다.

<br/>

## 화면 구성

<details>
  <summary>메인 화면</summary>
  <img src="https://github.com/user-attachments/assets/f7f0e308-8ae2-4149-9392-cd45868b1dfe" alt="메인 페이지" />
</details>
<details>
  <summary>회원가입 & 로그인</summary>
  <img src="https://github.com/user-attachments/assets/03f3c66f-4589-4e2f-885b-aeaf2574a47f" alt="회원가입 페이지" />
  <img src="https://github.com/user-attachments/assets/ce34b768-d857-4da8-aedd-eeb82f2a42d9" alt="로그인 페이지" />
</details>
<details>
  <summary>문제 풀이</summary>
  <img src="https://github.com/user-attachments/assets/06768dff-1418-48b0-bf41-daa02bad93c9" alt="실기 문제 풀이" />
  <img src="https://github.com/user-attachments/assets/570bc232-2a51-4f45-83ec-e5a227602f6a" alt="필기 기출 문제 풀이" />
</details>
<details>
  <summary>랜덤 문제 출력</summary>
  <img src="https://github.com/user-attachments/assets/c2c4dd66-be07-4c41-a19d-ad661ade8596" alt="랜덤 문제 출력" />
</details>
<details>
  <summary>오답 노트</summary>
  <img src="https://github.com/user-attachments/assets/46193b3b-491b-4f47-876c-523640bef82d" alt="오답 노트" />
</details>
<details>
  <summary>관리자 화면</summary>
  <img src="https://github.com/user-attachments/assets/30c1f8ae-02e0-4b7d-88a6-780dfd273ae0" alt="데일리 문제 관리자 화면" />
  <img src="https://github.com/user-attachments/assets/35f01621-7bee-4df1-ad34-f6a00a7c01d8" alt="필기 기출 문제 관리자 화면" />
</details>
<details>
  <summary>결제 페이지</summary>
  <img src="https://github.com/user-attachments/assets/6da34746-510c-40c6-b17b-172c6b395891" alt="결제 페이지" />
</details>

### 
## Getting Started

프로젝트의 각 부분에 대한 자세한 시작 방법은 해당 디렉토리의 README.md 파일을 참조하십시오.

- [Back-End 리포지토리](https://github.com/jong-seoung/GISA-Plus/tree/main/gisa-backend)
- [Front-End 리포지토리](https://github.com/jong-seoung/GISA-Plus/tree/main/gisa-frontend)
