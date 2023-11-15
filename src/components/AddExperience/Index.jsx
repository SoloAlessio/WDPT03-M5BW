import { useState, useEffect } from "react";
import { Button, Modal, FloatingLabel, Form, Row, Col } from "react-bootstrap";
import "./AddExperience.scss";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function AddExperience({ userId, show, setShow, expId }) {
  const handleClose = () => setShow(false);
  const [checked, setChecked] = useState(false);
  const [role, setRole] = useState("");
  const [company, setCompany] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [description, setDescription] = useState("");
  const [area, setArea] = useState("");
  const navigate = useNavigate();

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  useEffect(() => {
    if (expId) {
      fetch(
        `https://striveschool-api.herokuapp.com/api/profile/:${userId}/experiences/:${expId}`,
        {
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_MY_TOKEN}`,
          }
            .then((r) => r.json())
            .then((experience) => {
              setRole(experience.role);
              setCompany(experience.company);
              setStartDate(experience.startDate);
              setEndDate(experience.endDate);
              setDescription(experience.description);
              setArea(experience.area);
            }),
        }
      );
    }
  }, [expId, userId]);

  const handleSubmit = (e) => {
    e.preventDefault();

    let form = {
      role: role,
      company: company,
      startDate: startDate,
      endDate: checked ? null : endDate,
      description: description,
      area: area,
    };

    const url = expId
      ? `https://striveschool-api.herokuapp.com/api/profile/:${userId}/experiences/:${expId}`
      : `https://striveschool-api.herokuapp.com/api/profile/:${userId}/experiences`;

    const method = expId ? "PUT" : "POST";

    fetch(url, {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_MY_TOKEN}`,
        "Content-Type": "application/json",
      },
      method: method,
      body: JSON.stringify(form),
    }).then((r) => {
      if (r.ok) {
        toast.success(expId ? "modificato" : "salvato");
        setRole("");
        setCompany("");
        setStartDate("");
        setEndDate("");
        setDescription("");
        setArea("");
        navigate("/Profile");
      } else {
        toast.error("oh oh riprova!");
      }
    });
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Aggiungi Esperienza</Modal.Title>
        </Modal.Header>
        <div style={{ background: "#EDF3F8", padding: "1rem" }}>
          <h2 className="fs-7">Informa la rete</h2>
          <p className="m-0 AddExpLabel" style={{ fontSize: 14 }}>
            Attiva l’opzione per informare la tua rete delle principali
            modifiche al profilo (ad esempio un nuovo lavoro) e degli
            anniversari lavorativi. Gli aggiornamenti possono richiedere fino a
            2 ore. Scopri di più sulla{" "}
            <span className="colorBlu fw-semibold">
              condivisione delle modifiche del profilo
            </span>
            .
          </p>
        </div>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="Role" className="mb-3">
              <Form.Label>Qualifica</Form.Label>
              <Form.Control
                required
                type="text"
                value={role}
                autoComplete="given-name"
                className="border rounded"
                placeholder="Esempio: CTO"
                onChange={(e) => {
                  setRole(e.target.value);
                }}
              />
            </Form.Group>

            <Row className="mb-3">
              <Form.Group as={Col} controlId="Company">
                <Form.Label>Nome Azienda</Form.Label>
                <Form.Control
                  required
                  type="text"
                  value={company}
                  autoComplete="given-name"
                  className="border rounded"
                  placeholder="Esempio: EPICODE"
                  onChange={(e) => {
                    setCompany(e.target.value);
                  }}
                />
              </Form.Group>
              <Form.Group as={Col} controlId="Area">
                <Form.Label>Località</Form.Label>
                <Form.Control
                  required
                  type="text"
                  className="border rounded"
                  value={area}
                  placeholder="Esempio: Milano, Roma"
                  onChange={(e) => {
                    setArea(e.target.value);
                  }}
                />
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="startDate">
                <Form.Label className="mb-2">Inizio:</Form.Label>
                <input
                  type="date"
                  className="d-block w-50 mb-2 p-2 rounded border"
                  required
                  value={startDate}
                  id="startDate"
                  onChange={(e) => {
                    setStartDate(e.target.value);
                  }}
                />
              </Form.Group>
              <Form.Group as={Col} controlId="endDate">
                <Form.Label className="mb-2 ">Fine:</Form.Label>
                <input
                  type="date"
                  className="d-block w-50 mb-2 p-2 rounded border"
                  disabled={checked}
                  id="endDate"
                  value={checked ? "" : endDate}
                  onChange={(e) => {
                    setEndDate(e.target.value);
                  }}
                />
                <Form.Check
                  type="checkbox"
                  style={{ fontSize: "14px" }}
                  label={`Attualmente ricopro questo ruolo`}
                  onChange={handleChange}
                />
              </Form.Group>
            </Row>
            <FloatingLabel
              controlId="Description"
              label="Describe your Experience"
              className="mb-3"
            >
              <Form.Control
                as="textarea"
                placeholder="Leempio:ve a comment here"
                style={{ height: "100px" }}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </FloatingLabel>

            <Button className="rounded-2 py-2 w-100 btn-blue" type="submit">
              Aggiungi Esperienza
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default AddExperience;
