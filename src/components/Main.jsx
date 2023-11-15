import { Container, Row, Col } from "react-bootstrap";
import { useCallback, useEffect, useState } from "react";
import Jumbotron from "./Jumbotron/Index.jsx";
import Experiences from "./Experiences/WorkArea.jsx";

export default function Main() {
  const [myProfile, setMyProfile] = useState("");

  const getMyProfile = useCallback(() => {
    fetch("https://striveschool-api.herokuapp.com/api/profile/me", {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_MY_TOKEN}`,
      },
    })
      .then((r) => r.json())
      .then(setMyProfile);
  }, []);

  useEffect(() => {
    getMyProfile();
  }, [getMyProfile]);

  return (
    <Container className="mt-4">
      <Row>
        <Col xs={8}>
          <Jumbotron myProfile={myProfile} />
          {myProfile && <Experiences userId={myProfile._id} />}
        </Col>
      </Row>
    </Container>
  );
}
