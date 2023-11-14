import { Container, Row, Col, Button } from "react-bootstrap";
import { Pencil, CameraFill } from "react-bootstrap-icons";
import link_back from "./Link_back.jpg"
import "./jumbotron.scss"

export default function jumbotron() {
    return (

        
            <Container fluid className="bg-light">
                <Row>
                    <Col className="jumbotronBackground">
                       <img src={link_back} alt="link_back" />
                       <div className="jumbotron_camera">
                        <CameraFill/>
                       </div>
                    </Col>
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