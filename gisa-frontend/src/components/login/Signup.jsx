import React, { useState } from 'react';
import { Form, Button, Container, Alert } from 'react-bootstrap';
import { useApiAxios } from "../../api";
import { useNavigate } from "react-router-dom";

const SignupPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    password2: '',
  });
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  // useApiAxios 훅 사용
  const [{ response, error, loading }, executeSignup] = useApiAxios(
    {
      url: '/accounts/signup/',
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
    try {
      const response = await executeSignup({ data: formData });
      if (response?.status === 201) {
        setSuccessMessage('회원가입이 성공적으로 완료되었습니다!');
        setTimeout(() => {
            window.location.href = '/'
        }, 2000);
      }
    } catch (error) {
      if (error.response?.status === 400) {
        setErrors(error.response.data); 
      } else {
        console.error("회원가입 실패:", error);
      }
    }
  };

  return (
    <Container className="mt-5" style={{ maxWidth: '500px' }}>
      <h2 className="text-center">회원가입</h2>
      {successMessage && (
        <Alert variant="success">
          {successMessage}, 자동 로그인 됩니다.
        </Alert>
      )}
      {error && (
        <Alert variant="danger">
          회원가입에 실패했습니다. 입력 내용을 확인하세요.
        </Alert>
      )}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formEmail" className="mt-3">
          <Form.Label>이메일</Form.Label>
          <Form.Control
            type="email"
            name="email"
            placeholder="이메일 입력"
            value={formData.email}
            onChange={handleChange}
            isInvalid={!!errors.email}
          />
          <Form.Control.Feedback type="invalid">
            {errors.email?.join(" ")}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formUsername" className="mt-3">
          <Form.Label>사용자 이름</Form.Label>
          <Form.Control
            type="text"
            name="username"
            placeholder="사용자 이름 입력"
            value={formData.username}
            onChange={handleChange}
            isInvalid={!!errors.username}
          />
          <Form.Control.Feedback type="invalid">
            {errors.username?.join(" ")}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formPassword" className="mt-3">
          <Form.Label>비밀번호</Form.Label>
          <Form.Control
            type="password"
            name="password"
            placeholder="비밀번호 입력"
            value={formData.password}
            onChange={handleChange}
            isInvalid={!!errors.password}
          />
          <Form.Control.Feedback type="invalid">
            {errors.password?.join(" ")}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formPassword2" className="mt-3">
          <Form.Label>비밀번호 확인</Form.Label>
          <Form.Control
            type="password"
            name="password2"
            placeholder="비밀번호 확인 입력"
            value={formData.password2}
            onChange={handleChange}
            isInvalid={!!errors.password2}
          />
          <Form.Control.Feedback type="invalid">
            {errors.password2?.join(" ")}
          </Form.Control.Feedback>
        </Form.Group>

        <Button variant="primary" type="submit" className="mt-4" block disabled={loading}>
          {loading ? '회원가입 중...' : '회원가입'}
        </Button>
      </Form>
    </Container>
  );
};

export default SignupPage;
