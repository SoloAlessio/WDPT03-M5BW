import { Container } from "react-bootstrap";
import { Linkedin } from "react-bootstrap-icons";

function WorkInProgress() {
  return (
    <Container
      fluid
      className="text-center d-flex align-items-center"
      style={{ minHeight: "90vh" }}
    >
      <Container>
        <Linkedin size={100} color="#0a66c2" />
        <h5 className="mt-3">Work in progress... please be patient!</h5>
      </Container>
    </Container>
  );
}

export default WorkInProgress;
