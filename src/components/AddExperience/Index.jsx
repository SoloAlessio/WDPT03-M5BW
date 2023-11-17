import { useState, useEffect } from "react";
import { Button, Modal, FloatingLabel, Form, Row, Col } from "react-bootstrap";
import "./AddExperience.scss";
import { toast } from "react-toastify";

function AddExperience({ userId, show, setShow, expId, getExperiences }) {
  const handleClose = () => setShow(false);
  const url = expId
    ? `https://striveschool-api.herokuapp.com/api/profile/:${userId}/experiences/:${expId}`
    : `https://striveschool-api.herokuapp.com/api/profile/:${userId}/experiences`;

  const method = expId ? "PUT" : "POST";
  const [checked, setChecked] = useState(false);

  const [form, setForm] = useState({
    role: "",
    company: "",
    startDate: "",
    endDate: new Date().toString().slice(0, 10),
    description: "",
    area: "",
  });

  useEffect(() => {
    if (expId) {
      fetch(
        `https://striveschool-api.herokuapp.com/api/profile/${userId}/experiences/${expId}`,
        {
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_MY_TOKEN}`,
          },
        }
      )
        .then((r) => r.json())
        .then((experience) => {
          setForm({
            role: experience.role,
            company: experience.company,
            startDate: experience.startDate.slice(0, 10),
            endDate:
              experience.endDate?.slice(0, 10) ||
              new Date().toISOString().slice(0, 10),
            description: experience.description,
            area: experience.area,
          });
          setChecked(!experience.endDate);
        });
    }
  }, [expId, userId]);

  const handleSubmit = (e) => {
    e.preventDefault();

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
        setForm({
          role: "",
          company: "",
          startDate: "",
          endDate: new Date().toString().slice(0, 10),
          description: "",
          area: "",
        });
        handleClose();
        getExperiences();
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
          <p className="m-0 AddExpLabel" style={{ fontSize: "14px" }}>
            Attiva l'opzione per informare la tua rete delle principali
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
                value={form.role}
                autoComplete="given-name"
                className="border rounded"
                placeholder="Esempio: CTO"
                onChange={(e) => {
                  setForm({ ...form, role: e.target.value });
                }}
              />
            </Form.Group>

            <Row className="mb-3">
              <Form.Group as={Col} controlId="Company">
                <Form.Label>Nome Azienda</Form.Label>
                <Form.Control
                  required
                  type="text"
                  value={form.company}
                  autoComplete="given-name"
                  className="border rounded"
                  placeholder="Esempio: EPICODE"
                  onChange={(e) => {
                    setForm({ ...form, company: e.target.value });
                  }}
                />
              </Form.Group>
              <Form.Group as={Col} controlId="Area">
                <Form.Label>Località</Form.Label>
                <Form.Control
                  required
                  type="text"
                  className="border rounded"
                  value={form.area}
                  placeholder="Esempio: Milano, Roma"
                  onChange={(e) => {
                    setForm({ ...form, area: e.target.value });
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
                  value={form.startDate}
                  id="startDate"
                  onChange={(e) => {
                    setForm({ ...form, startDate: e.target.value });
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
                  value={checked ? "" : form.endDate}
                  onChange={(e) => {
                    setForm({ ...form, endDate: e.target.value });
                  }}
                />
                <Form.Check
                  type="checkbox"
                  checked={checked}
                  style={{ fontSize: "14px" }}
                  label={`Attualmente ricopro questo ruolo`}
                  onChange={() => setChecked(!checked)}
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
                value={form.description}
                required
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
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
