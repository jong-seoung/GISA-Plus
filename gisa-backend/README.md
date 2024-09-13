# Gisa-Plus

Gisa-Plus 백엔드 부분을 담당하는 리포지토리입니다. 이 프로젝트는 Django와 Django Rest Framework(DRF)를 기반으로 서버 및 데이터베이스를 구축하였습니다.

<br/>

## 사용 기술 스택

| **분야**   | **기술 스택**                               |
| ---------- | ------------------------------------------- |
| **백엔드** | Python, Django, Django Rest Framework (DRF) |
| **DB**     | PostgreSQL                                  |
| **Infra**  | AWS (Lightsail)                             |
| **API**    | Portone API                                 |

<br/>

## Getting Started

1. **Back-End 서버 실행 방법 - 로컬/개발**

```bash
# 가상 환경 생성 및 활성화
python -m venv venv
source venv/bin/activate  # 윈도우의 경우 venv\Scripts\activate

# 패키지 설치
pip install -r requirements.txt

# 마이그레이션 및 서버 실행
python manage.py migrate
python manage.py runserver
```

2. **Back-End 서버 실행 방법 - 배포 버전**

```bash
# 패키지 설치
pip install -r requirements.txt

# 환경 설정 (예: .env 파일 설정)

# 마이그레이션 적용
python manage.py migrate

# 배포를 위한 웹 서버 (예: gunicorn) 실행
gunicorn gisa_backend.wsgi:application --bind 0.0.0.0:8000

# Nginx 설정 후 배포 완료
```
