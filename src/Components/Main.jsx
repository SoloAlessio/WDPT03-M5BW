
import Jumbotron from "./Jumbotron"
import { Container, Row, Col } from "react-bootstrap"

export default function main() {
    return (
        <Container>
            <Row>
                <Col xs={12}>
                    <Jumbotron/>
                </Col>
            </Row>
        </Container>
    )
}