import { Container, Row, Col } from "react-bootstrap";
import "./ChatArea.scss";
import * as Icon from "react-bootstrap-icons";

export default function ChatArea() {
  return (
    <Container
      id="MessageArea"
      className="bg-white border rounded-top-3 p-3 d-md-fixed"
    >
      <Row className="align-items-center">
        <Col lg="auto">
          <img
            src="https://images.pexels.com/photos/8204385/pexels-photo-8204385.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt=""
            width={"32px"}
            height={"32px"}
            className="rounded-circle object-fit-cover"
          />
        </Col>
        <Col className="ps-0">
          <p className="mb-0 fw-semibold pe-5">Messagistica</p>
        </Col>
        <Col>
          <Icon.ThreeDots />
        </Col>
        <Col>
          <Icon.PencilSquare />
        </Col>
        <Col>
          <Icon.ChevronUp />
        </Col>
      </Row>
    </Container>
  );
}
