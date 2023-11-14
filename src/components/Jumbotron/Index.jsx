import { Container, Row, Col, Button } from "react-bootstrap";
import { Pencil, CameraFill } from "react-bootstrap-icons";
import default_imgProfile from "./default.png"
import "./jumbotron.scss"

export default function Jumbotron({myProfile}) {
   
    return (

        
        <Container fluid className="bg-white container-fluid border rounded-3">
            <Row>
                <Col xs={12} className="jumbotronBackground">
                    <img src="https://static.licdn.com/aero-v1/sc/h/55k1z8997gh8dwtihm11aajyq" alt="link_back" className="rounded-top-3" />
                    <div className="jumbotron_camera">
                        <CameraFill />
                    </div>
                </Col>
            </Row>
            <Row>
                <Col xs={12} className="ps-4">
                    <div className="jumbotronProfile">
                        <img src={default_imgProfile} alt="" />
                        <Button variant="light" className="rounded-circle"><Pencil /></Button>
                    </div>
                    <div className="my-4 d-flex justify-content-between">
                        <div>
                                <h3 className="m-0 fs-4 text">William Costa</h3>
                                <p className="mb-1">Impiegato operativo</p>
                                <p className="text-secondary fs-7 m-0">Lonate Pozzolo, Lombardia, Italia · <span className="fw-semibold colorBlu">Informazioni di contatto</span> </p>
                                <p className="fs-7 fw-semibold colorBlu">93 collegamenti</p>
                                <Button  className="rounded-pill fw-semibold btn-blue me-2">Disponibile Per</Button>
                                <Button  className="rounded-pill fw-semibold btn-white me-2">Aggiungi sezione del profilo</Button>
                                <Button  className="rounded-pill fw-semibold btn-grey">Altro</Button>
                        </div>
                        <div className="me-auto ms-20"><p className="fw-semibold">Ultima esperienza</p></div>
                    </div>
                </Col>
            </Row>
        </Container>

    )
}