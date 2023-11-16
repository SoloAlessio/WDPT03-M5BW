import { Col, Container, Row, Button } from "react-bootstrap";
import { PlusLg } from "react-bootstrap-icons";
import { useState, useEffect } from "react";
import "./experiences.scss";
import AddExperience from "../AddExperience/Index";
import SingleExperience from "./SingleExperience";

export default function Experiences({ userId, myId }) {
  const [show, setShow] = useState(false);
  const [exp, setExp] = useState([]);

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
      .then(setExp);
  }, [userId]);

  return (
    <Container fluid className="bg-white border rounded-3 p-4 mt-2 experiences">
      <Row className="experience-header mb-5">
        <Col xs={12} className="d-flex justify-content-between">
          <h4>Esperienze</h4>
          {userId === myId && (
            <>
              <AddExperience userId={userId} show={show} setShow={setShow} />
              <Button
                variant="light"
                className="rounded-circle ms-auto"
                onClick={() => setShow(true)}
              >
                <PlusLg size={25} />
              </Button>
            </>
          )}
        </Col>
      </Row>

      <Row className="mt-3">
        {exp.map((e) => (
          <Col xs={12} className="mb-4" key={e._id}>
            <SingleExperience Experience={e} userId={userId} myId={myId} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}
