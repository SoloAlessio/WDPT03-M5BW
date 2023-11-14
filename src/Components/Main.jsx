import { Container, Row, Col } from "react-bootstrap"
import Jumbotron from "./Jumbotron/Index"
export default function main() {
    return (
        <Container>
            <Row>
                <Col xs={8}>
                    <Jumbotron/>
                </Col>
            </Row>
        </Container>
    )
}