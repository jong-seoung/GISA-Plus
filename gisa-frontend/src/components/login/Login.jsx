import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Alert } from 'react-bootstrap';
import { useApiAxios } from "../../api";

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errorMessage, setErrorMessage] = useState('');

  // useApiAxios 훅 사용
  const [{ response, error, loading }, executeLogin] = useApiAxios(
    {
      url: '/accounts/login/',
      method: 'POST',
    },
    { manual: true } // 수동으로 요청 실행하기 위해 manual: true 설정
  );

  // 폼 변경 핸들러
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // 폼 제출 핸들러
  const handleSubmit = async (e) => {
    e.preventDefault();
    executeLogin({ data: formData });
  };

  // 로그인 성공 시 홈 페이지로 이동
  useEffect(() => {
    if (response && response.status === 200) {
        window.location.href = '/'
    }
  }, [response]);

  return (
    <Container className="mt-5" style={{ maxWidth: '400px' }}>
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

        <Button variant="primary" type="submit" className="mt-3" block disabled={loading}>
          {loading ? '로그인 중...' : '로그인'}
        </Button>
      </Form>
    </Container>
  );
};

export default LoginPage;
