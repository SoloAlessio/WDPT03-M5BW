import { Col, Container, Row, Button } from "react-bootstrap";
import { Pencil, PlusLg } from "react-bootstrap-icons";
import { useState, useEffect } from "react";
import "./experiences.scss";
import AddExperience from "../AddExperience/Index";
import SingleExperience from "./SingleExperience";

export default function Experiences({ userId }) {
  const [show, setShow] = useState(false);
  const [profile, setProfile] = useState([]);
  const handleShow = () => setShow(true);
  const experiences = profile.length;

  useEffect(() => {
    fetch(
      `https://striveschool-api.herokuapp.com/api/profile/${userId}/experiences`,
      {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_MY_TOKEN}`,
        },
      }
    )
      .then((r) => r.json())
      .then(setProfile);
  }, [userId, experiences]);

  return (
    <Container fluid className="bg-white border rounded-3 p-4 mt-2 experiences">
      <Row className="experience-header mb-4">
        <Col xs={12} className="d-flex justify-content-between">
          <h4>Esperienza</h4>
          <AddExperience userId={userId} show={show} setShow={setShow} />
          <Button
            variant="light"
            className="rounded-circle ms-auto"
            onClick={handleShow}
          >
            <PlusLg size={25} fill="#00000099" />
          </Button>
          <Button variant="light" className="rounded-circle">
            <Pencil size={25} fill="#00000099" />
          </Button>
        </Col>
      </Row>

      <Row className="mt-3">
        {profile.map((p) => (
          <Col xs={12} className="mb-4" key={p._id}>
            <SingleExperience profile={p} userId={userId} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}
