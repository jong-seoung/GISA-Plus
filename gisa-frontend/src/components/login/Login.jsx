import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Container, Alert } from "react-bootstrap";

import { useApiAxios } from "../../api";
import { useStatusContext } from "../../contexts/StatusContext";

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const is_authenticated = useStatusContext();
  const navigate = useNavigate();

  // useApiAxios 훅 사용
  const [{ response, error, loading }, executeLogin] = useApiAxios(
    {
      url: "/accounts/login/",
      method: "POST",
    },
    { manual: true } // 수동으로 요청 실행하기 위해 manual: true 설정
  );

  // 폼 변경 핸들러
  const handleChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    executeLogin({ data: formData });
  };

  useEffect(() => {
    if (response && response.status === 200) {
      window.location.href = "/";
    }
  }, [response]);

  useEffect(() => {
    if (is_authenticated === true) {
      navigate("/");
    }
  }, [is_authenticated, navigate]);

    // 회원 관리 페이지로 이동
    const handleSignup = () => {
      navigate("/signup"); 
    };

  return (
    <Container className="mt-5" style={{ maxWidth: "400px" }}>
      <h2 className="text-center">로그인</h2>
      {error && (
        <Alert variant="danger">
          로그인 실패. 이메일이나 비밀번호를 확인하세요.
        </Alert>
      )}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formEmail">
          <Form.Label>아이디</Form.Label>
          <Form.Control
            type="username"
            name="username"
            placeholder="이메일 입력"
            value={formData.username}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="formPassword" className="mt-3">
          <Form.Label>비밀번호</Form.Label>
          <Form.Control
            type="password"
            name="password"
            placeholder="비밀번호 입력"
            value={formData.password}
            onChange={handleChange}
          />
        </Form.Group>
        <div>
          <Button
            variant="outline-primary"
            type="submit"
            className="mt-3 w-100"
            block
            disabled={loading}
          >
            {loading ? "로그인 중..." : "로그인"}
          </Button>

          <Button
            variant="outline-success"
            className="mt-3 w-100"
            onClick={handleSignup} // 회원가입 버튼 클릭 시 handleSignup 함수 실행
          >
            회원가입
          </Button>
        </div>
      </Form>
    </Container>
  );
};

export default LoginPage;
