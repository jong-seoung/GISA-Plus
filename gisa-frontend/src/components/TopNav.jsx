import { NavLink, useNavigate } from "react-router-dom";
import { Alert, Container, Nav, Navbar, NavDropdown } from "react-bootstrap";

import { useApiAxios } from "../api";
import { LOGOUT_URL, PROFILE_URL, SIGNUP_URL } from "../constants";
import { StatusProvider, useStatusContext } from "../contexts/StatusContext";

// Alert 컴포넌트의 variant 속성
//  - https://react-bootstrap.github.io/docs/components/alerts/#alert
const VARIANT_MAP = {
  debug: "secondary",
  info: "info",
  success: "success",
  warning: "warning",
  error: "danger",
};

function TopNav() {
  const {
    is_authenticated = null,
    username = "",
    messages = [],
  } = useStatusContext();

  const [{ loading, error }, executeLogout] = useApiAxios(
    {
      url: LOGOUT_URL,
      method: "POST",
    },
    { manual: true } // 요청을 수동으로 실행하기 위해 manual: true 설정
  );

  const handleLogout = async () => {
    try {
      const response = await executeLogout(); // 로그아웃 POST 요청 전송
      if (response?.status === 200) {
        window.location.href = '/'
      } else {
        console.error("로그아웃 실패:", response);
      }
    } catch (error) {
      console.error("로그아웃 실패:", error);
    }
  };

  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand to={"/"} as={NavLink}>
            GISA-Plus
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto" variant="underline">
              <Nav.Link to="/blog" as={NavLink}>
                기출
              </Nav.Link>
              <Nav.Link to="/about" as={NavLink}>
                가나다
              </Nav.Link>
              {is_authenticated !== null && (
                <NavDropdown
                  title={is_authenticated ? `${username}의 계정` : "계정"}
                  id="basic-nav-dropdown"
                >
                  {!is_authenticated && (
                    <>
                      <NavDropdown.Item to="/login" as={NavLink}>
                        로그인
                      </NavDropdown.Item>
                      <NavDropdown.Item to={SIGNUP_URL} as={NavLink}>
                        회원가입
                      </NavDropdown.Item>
                    </>
                  )}
                  {is_authenticated && (
                    <>
                      <NavDropdown.Item to={PROFILE_URL} as={NavLink}>
                        프로필
                      </NavDropdown.Item>
                      <NavDropdown.Divider />
                      <NavDropdown.Item onClick={handleLogout}>
                        로그아웃
                      </NavDropdown.Item>
                    </>
                  )}
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {is_authenticated !== null && (
        <Container>
          <Alert variant="info" className="mt-2">
            Your username is <strong>{username}</strong>.
          </Alert>
        </Container>
      )}

      {messages.length > 0 && (
        <Container>
          {messages.map((message, index) => (
            <Alert
              key={index}
              variant={VARIANT_MAP[message.tags]}
              className="mt-2"
            >
              {message.message}
            </Alert>
          ))}
        </Container>
      )}
    </>
  );
}

export default TopNav;
