import { Container } from "react-bootstrap";

export default function NotFound() {
  return (
    <Container
      className="text-center d-flex justify-content-center align-items-center"
      style={{ minHeight: "100%" }}
    >
      <h1>404</h1>
      <p>Page Not Found</p>
    </Container>
  );
}
