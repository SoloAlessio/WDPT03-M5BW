import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import Jumbotron from "./Jumbotron/Index";
import Experiences from "./Experiences/WorkArea";

export default function ProfileDetail() {
  const [myProfile, setMyProfile] = useState({});
  const { id } = useParams();

  const getMyProfile = useCallback(() => {
    fetch(`https://striveschool-api.herokuapp.com/api/profile/${id}`, {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_MY_TOKEN}`,
      },
    })
      .then((r) => r.json())
      .then(setMyProfile);
  }, [id]);

  useEffect(() => {
    getMyProfile();
  }, [getMyProfile]);


  return (
    <Container className="mt-4">
      <Row>
        <Col xs={8}>
          <Jumbotron myProfile={myProfile} />
          <Experiences userId={id} />
        </Col>
      </Row>
    </Container>
  );
}
