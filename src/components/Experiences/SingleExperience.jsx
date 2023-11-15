import { Col } from "react-bootstrap";

export default function SingleExperience() {
  return (
    <>
      <Col className="d-flex gap-2">
        <div>
          <img
            src=""
            style={{ width: "48px", height: "48px", backgroundColor: "grey" }}
          />
        </div>
        <div className="details">
          <h6>qualifica/impiegat*</h6>
          <p>
            nome dell'azienda ·
            <span> tipo di impiego (a tempo pieno/part time)</span>
          </p>
          <p>tipo di località/da remoto</p>
          <p className="text-body-secondary">
            impiega* da (luglio 2021) - Presente · 2 anni e tot mesi
          </p>
          <p className="text-body-secondary">località/ Bologna</p>
          <br />
          <p>descrizione</p>
        </div>
      </Col>
    </>
  );
}
