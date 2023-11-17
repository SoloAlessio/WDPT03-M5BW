import { Container, Row, Col, Button } from "react-bootstrap";
import { Pencil, CameraFill } from "react-bootstrap-icons";
import "./jumbotron.scss";
import { useState } from "react";
import ModifyImg from "./ModifyImg.jsx";
import * as Icon from "react-bootstrap-icons";

export default function Jumbotron({ myProfile, getMyProfile, myId }) {
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  return (
    <Container
      fluid
      className="bg-white container-fluid border rounded-3 overflow-hidden"
    >
      <Row>
        <Col
          xs={12}
          className="jumbotronBackground d-flex justify-content-center align-items-center overflow-hidden"
        >
          <img
            src={myProfile["image"]}
            alt="link_back"
            className="rounded-top-3"
          />
          <div className="jumbotron_camera">
            <CameraFill />
          </div>
        </Col>
      </Row>
      <Row className="mx-1">
        <Col md={12} className="jumbotronProfile">
          <div
            className="position-relative profile"
            onClick={myId === myProfile["_id"] ? handleShow : handleClose}
            style={
              myId === myProfile["_id"]
                ? { cursor: "pointer" }
                : { cursor: "inherit" }
            }
          >
            <img src={myProfile["image"]} className="rounded-circle" alt="" />
            {myProfile["_id"] === myId && (
              <div className="icon">
                <Icon.CameraFill className="position-absolute top-50 start-50 translate-middle fs-3 text-white" />
              </div>
            )}
          </div>
          <Button variant="light" className="rounded-circle">
            <Pencil />
          </Button>
        </Col>
        <Col xs={12} className="mt-4">
          <h3 style={{ marginBottom: 0 }}>
            {myProfile["name"]} {myProfile["surname"]}
          </h3>
          <p style={{ margin: 0 }}>{myProfile["title"]}</p>
          <p className="text-secondary fs-7" style={{ margin: 0 }}>
            {myProfile["area"]} ·{" "}
            <span className="fw-semibold colorBlu">
              Informazioni di contatto
            </span>{" "}
          </p>
          <p className="fs-7 fw-semibold colorBlu">93 collegamenti</p>
        </Col>
        <Col xs={12} className="mb-3 d-flex flex-wrap gap-2">
          <Button className="rounded-pill fw-semibold btn-blue">
            Disponibile Per
          </Button>
          <Button className="rounded-pill fw-semibold btn-white">
            Aggiungi sezione del profilo
          </Button>
          <Button className="rounded-pill fw-semibold btn-grey">Altro</Button>
        </Col>
      </Row>
      <ModifyImg
        show={show}
        setShow={setShow}
        myProfile={myProfile}
        getMyProfile={getMyProfile}
      />
    </Container>
  );
}
