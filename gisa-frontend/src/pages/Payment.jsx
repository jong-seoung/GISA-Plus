import React, { useState, useEffect } from "react";
import { Button, Form, Col, Row } from "react-bootstrap";
import { PortOne } from "../constants";
import { makeRestApi } from "../api"

const Payment_REST_API = makeRestApi("payment/api/purchase-subscription/");

const Payment = ({ name, number }) => {
  // name = "정보처리기사"
  // number = 100;

  const [formData, setFormData] = useState({
    pgValue: "kakaopay.TC0ONETIME", // 기본 PG사 코드
    payMethod: "kakaopay", // 기본 결제 방법
    merchant_uid: `ORD${new Date().getTime()}`,
    name: name,
    amount: number,
    buyer_email: "",
    buyer_name: "",
    buyer_tel: "",
    buyer_addr: "",
    buyer_postcode: "",
  });

  useEffect(() => {
    let script = document.querySelector(
      `script[src="https://cdn.iamport.kr/v1/iamport.js"]`
    );

    if (!script) {
      script = document.createElement("script");
      script.src = "https://cdn.iamport.kr/v1/iamport.js";
      script.async = true;
      document.body.appendChild(script);
    }

    return () => {
      if (script) {
        document.body.removeChild(script);
      }
    };
  }, []);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const onclickPay = (pgValue,payMethod) => {
    const { IMP } = window;
    IMP.init(PortOne);

    const data = {
      pg: pgValue,//"PG사구분코드.{사이트코드}"
      pay_method: payMethod,
      ...formData,
      m_redirect_url: "",
    };

    IMP.request_pay(data, async rsp => {
      if (rsp.success) {
        try {
          console.log("백엔드로 결제 정보 전송");
          const data =             {
            imp_uid: rsp.imp_uid,
            merchant_uid: rsp.merchant_uid,
            amount: rsp.paid_amount,
            categoryName: {name}, 
            status: rsp.status,
            paid_at: rsp.paid_at,
          }
          const response = Payment_REST_API.create({ data });
          console.log("백엔드에 결제 정보 저장 성공", response);
        } catch (error) {
          console.error("백엔드에 결제 정보 저장 실패");
        }
      } else {
        console.log("결제 실패", rsp);
      }
    });
  };

  return (
    <Form>
      <Form.Group controlId="formGridName">
        <Form.Label>상품 이름</Form.Label>
        <Form.Control
          type="text"
          placeholder={name}
          name="name"
          value={formData.name}
          disabled
        />
      </Form.Group>

      <Form.Group controlId="formGridAmount">
        <Form.Label>결제 금액</Form.Label>
        <Form.Control
          type="number"
          placeholder={number}
          name="amount"
          value={formData.amount}
          disabled
        />
      </Form.Group>

      <Form.Group controlId="formGridEmail">
        <Form.Label>이메일</Form.Label>
        <Form.Control
          type="email"
          placeholder="이메일을 입력하세요"
          name="buyer_email"
          value={formData.buyer_email}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group controlId="formGridName">
        <Form.Label>이름</Form.Label>
        <Form.Control
          type="text"
          placeholder="이름을 입력하세요"
          name="buyer_name"
          value={formData.buyer_name}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group controlId="formGridTel">
        <Form.Label>전화번호</Form.Label>
        <Form.Control
          type="text"
          placeholder="전화번호를 입력하세요"
          name="buyer_tel"
          value={formData.buyer_tel}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group controlId="formGridAddress">
        <Form.Label>주소</Form.Label>
        <Form.Control
          placeholder="주소를 입력하세요"
          name="buyer_addr"
          value={formData.buyer_addr}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group controlId="formGridPostcode">
        <Form.Label>우편번호</Form.Label>
        <Form.Control
          placeholder="우편번호를 입력하세요"
          name="buyer_postcode"
          value={formData.buyer_postcode}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group as={Col} controlId="formGridPayMethod">
        <Form.Label>결제 방법</Form.Label>
        <Button onClick={() => onclickPay("kakaopay.TC0ONETIME", "kakaopay")}>
          카카오페이
        </Button>
        <Button onClick={() => onclickPay("html5_inicis.INIpayTest", "card")}>
          KG이니시스
        </Button>
      </Form.Group>
    </Form>
  );
};

export default Payment;
