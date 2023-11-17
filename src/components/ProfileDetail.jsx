import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import Jumbotron from "./Jumbotron/Index";
import Experiences from "./Experiences/WorkArea";

export default function ProfileDetail() {
  const [myProfile, setMyProfile] = useState({});
  const { id } = useParams();
  const [myId, setMyId] = useState("");

  const getMyProfile = useCallback(() => {
    fetch(`https://striveschool-api.herokuapp.com/api/profile/${id}`, {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_MY_TOKEN}`,
      },
    })
      .then((r) => r.json())
      .then(setMyProfile);
  }, [id]);

  const getMyPersonalProfile = useCallback(() => {
    fetch("https://striveschool-api.herokuapp.com/api/profile/me", {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_MY_TOKEN}`,
      },
    })
      .then((r) => r.json())
      .then((data) => {
        setMyId(data["_id"]);
      });
  }, []);

  useEffect(() => {
    getMyProfile();
    getMyPersonalProfile();
    window.scroll(0, 0);
  }, [getMyProfile, getMyPersonalProfile]);

  return (
    <Container className="mt-4">
      <Row>
        <Col md={8}>
          <Jumbotron myProfile={myProfile} myId={myId} />
          <Experiences userId={id} myId={myId} />
        </Col>
      </Row>
    </Container>
  );
}
