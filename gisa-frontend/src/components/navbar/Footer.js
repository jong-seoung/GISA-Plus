import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./Footer.css"; // Footer 스타일을 위한 CSS 파일 import

const Footer = () => {
  return (
    <footer className="footer mt-auto py-3 bg-light">
      <Container>
        <Row>
          <Col lg="9" md="12" className="mb-4 mb-md-0">
            <br />
            <p>
            기사플러스는 자격증 시험을 온라인에서 풀이해 볼 수 있는 사이트 입니다.
            기출문제의 저작권은 출제기관에게 있으며, 관련 문의는 이메일바랍니다.
            </p>
          </Col>

          <Col lg="3" md="9" className="mb-4 mb-md-0">
            <h4 className="text-uppercase">비지니스 문의</h4>
            <ul className="list-unstyled">
              <li>
                <a href="mailto:support@example.com" className="text-dark">
                  Gisa-Plus@gmail.com
                </a>
              </li>
              {/* <li>
                <a href="tel:+123456789" className="text-dark">
                  +1 234 567 89
                </a>
              </li>
              <li>
                <p className="text-dark">서울시 강남구 테헤란로 123</p>
              </li> */}
            </ul>
          </Col>
        </Row>

        <div className="text-center p-3" style={{ backgroundColor: "#f1f1f1" }}>
          © 2024 Gisa-Plus
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
