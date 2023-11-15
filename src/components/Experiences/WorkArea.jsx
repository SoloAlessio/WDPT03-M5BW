import { Col, Container, Row, Button } from "react-bootstrap";
import { Pencil, PlusLg } from "react-bootstrap-icons";
import SingleExperience from "./SingleExperience";
import "./experiences.scss";
import AddExperience from "../AddExperience/Index";
import { useState } from "react";

export default function Experiences({ userId }) {
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);


  return (
    <Container fluid className="bg-white border rounded-3 p-4 mt-2 experiences">
      <Row>
        <Col xs={12} className="d-flex justify-content-between">
          <h4>Esperienza</h4>
          <AddExperience userId={userId} show={show} setShow={setShow} />
          <Button variant="light" className="rounded-circle ms-auto" onClick={handleShow}>
            <PlusLg size={25} fill="#00000099" />
          </Button>
          <Button variant="light" className="rounded-circle">
            <Pencil size={25} fill="#00000099" />
          </Button>
        </Col>
      </Row>

      <Row className="mt-3">
        <SingleExperience />
      </Row>
    </Container>
  );
}
