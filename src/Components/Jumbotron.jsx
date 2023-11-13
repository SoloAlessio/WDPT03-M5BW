import { Container, Row, Col, Button } from "react-bootstrap";
import { Pencil } from "react-bootstrap-icons";

export default function jumbotron() {
    return (

        
            <Container fluid className="bg-light">
                <Row>
                    <Col>Ciao</Col>
                </Row>
                <Row>
                    <Col>
                    <h3>William Costa </h3>
                    <p>Impiegato operativo</p>
                    <p>Lonate Pozzolo, Lombardia, Italia</p>
                    <Button variant="primary">Disponibile Per</Button>
                    <Button variant="light">Aggiungi sezione del profilo</Button>
                    <Button variant="light">Altro</Button>
                    <Pencil/>
                    </Col>
                </Row>
            </Container>
        
    )
}