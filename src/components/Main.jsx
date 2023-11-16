import { Container, Row, Col } from "react-bootstrap";
import { useCallback, useEffect, useState } from "react";
import Jumbotron from "./Jumbotron/Index.jsx";
import Experiences from "./Experiences/WorkArea.jsx";

export default function Main() {
  const [myProfile, setMyProfile] = useState("");
  const [myId, setMyId] = useState("");

  const getMyProfile = useCallback(() => {
    fetch("https://striveschool-api.herokuapp.com/api/profile/me", {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_MY_TOKEN}`,
      },
    })
      .then((r) => r.json())
      .then((data) => {
        setMyProfile(data);
        setMyId(data["_id"]);
      });
  }, []);

  useEffect(() => {
    getMyProfile();
    window.scrollTo(0, 0);
  }, [getMyProfile]);

  return (
    <Container className="mt-4">
      <Row>
        <Col md={8}>
          <Jumbotron
            myProfile={myProfile}
            getMyProfile={getMyProfile}
            myId={myId}
            userId={myProfile._id}
          />
          {myProfile && <Experiences userId={myProfile._id} myId={myId} />}
        </Col>
      </Row>
    </Container>
  );
}
