import { Container, Row, Col, Button } from "react-bootstrap";
import { Pencil, CameraFill } from "react-bootstrap-icons";
import link_back from "./Link_back.jpg"
import default_imgProfile from "./default.jpeg"
import "./jumbotron.scss"

export default function jumbotron() {
    return (


        <Container fluid className="bg-white border rounded">
            <Row>
                <Col className="jumbotronBackground">
                    <img src={link_back} alt="link_back" />
                    <div className="jumbotron_camera">
                        <CameraFill />
                    </div>
                </Col>
            </Row>
            <Row>
                <Col className="ps-3">
                    <div className="jumbotronProfile">
                        <img src={default_imgProfile} alt="" />
                        <Button variant="light" className="rounded-circle"><Pencil /></Button>
                    </div>
                    <div className="my-3 d-flex justify-content-between">
                        <div>
                                <h3 className="m-0">William Costa </h3>
                                <p className="mb-1">Impiegato operativo</p>
                                <p className="text-secondary fs-7">Lonate Pozzolo, Lombardia, Italia</p>
                                <Button  className="rounded-pill fw-semibold btn-blue">Disponibile Per</Button>
                                <Button  className="rounded-pill fw-semibold btn-white">Aggiungi sezione del profilo</Button>
                                <Button  className="rounded-pill fw-semibold btn-grey">Altro</Button>
                        </div>

                        <div className="me-auto ms-20"><p className="fw-semibold">Ultima esperienza</p></div>
                    </div>


                </Col>
            </Row>
        </Container>

    )
}