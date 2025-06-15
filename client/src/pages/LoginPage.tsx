import { Container, Row, Col } from "react-bootstrap";
import LoginForm from "../Components/LogIn";
import imgHomePage from "../../../public/logo192.png";
type LoginPageProps = {
  openRegister: () => void;
};

const LoginPage = ({ openRegister }: LoginPageProps) => {
  return (
    <div style={{ height: "100vh", overflow: "hidden" }}>
      <Container fluid className="p-0 h-100" dir="rtl">
        <Row className="h-100 m-0">
          {/* צד שמאל - תמונה */}
          <Col
            md={6}
            // className="d-none d-md-flex p-0"
            style={{
              height: "100vh",
              alignItems: "center",
              justifyContent: "center",
              display: "flex",
              // overflow: "hidden",
            }}
          >
            <img
              src="/imgHomePage.png"
              alt="טכנולוגיה"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
              }}
            />
          </Col>

          {/* צד ימין - טופס התחברות */}
          <Col
            md={6}
            xs={12}
            className="d-flex align-items-center justify-content-center p-4"
            style={{
              backgroundColor: "#ffffff",
              height: "100vh",
            }}
          >
            <div style={{ maxWidth: 360, width: "100%" }}>
              <LoginForm openRegister={openRegister} />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default LoginPage;
