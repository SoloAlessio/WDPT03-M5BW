import { useState, useEffect } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import "./AddExperience.scss"
import { toast } from "react-toastify";
function AddExperience({ userId, show, setShow, expId}) {

  
  const handleClose = () => setShow(false);
  const [checked, setChecked] = useState(false);
  const [role, setRole] = useState("")
  const [company, setCompany] = useState("")
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [description, setDescription] = useState("")
  const [area, setArea] = useState("")
  

  const handleChange = (event) => {
    setChecked(event.target.checked);
  }

  useEffect(() => {
    if (expId) {
      fetch(`https://striveschool-api.herokuapp.com/api/profile/${userId}/experiences/${expId}`, {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_MY_TOKEN}`
        }
          .then((r) => r.json())
          .then(experience => {
            setRole(experience.role);
            setCompany(experience.company);
            setStartDate(experience.startDate);
            setEndDate(experience.endDate);
            setDescription(experience.description);
            setArea(experience.area)
          })
      })
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
      area: area
    }

    const url = expId ? `https://striveschool-api.herokuapp.com/api/profile/${userId}/experiences/${expId}` : `https://striveschool-api.herokuapp.com/api/profile/${userId}/experiences`
    const method = expId ? "PUT" : "POST"

    fetch(url,
      {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_MY_TOKEN}`,
          "Content-Type": "application/json"
        },
        method: method,
        body: JSON.stringify(form)
      })
      .then((r) => {
        if (r.ok) { 
          toast.success(
            expId ? "modificato" : "salvato"
          );
          setRole("");
          setCompany("");
          setStartDate("");
          setEndDate("");
          setDescription("");
          setArea("");
        } else {

          toast.error("oh oh riprova!")
        }
      })
  }


  return (
    <>

      <Modal show={show} onHide={handleClose} size="lg" >
        <Modal.Header closeButton>
          <Modal.Title>Aggiungi Esperienza</Modal.Title>
        </Modal.Header>
        <div style={{ background: "#EDF3F8", padding: "1rem" }}>
          <h2 className='fs-7'>Informa la rete</h2>
          <p className='m-0 AddExpLabel' style={{ fontSize: 14 }}>Attiva l’opzione per informare la tua rete delle principali modifiche al profilo
            (ad esempio un nuovo lavoro) e degli anniversari lavorativi. Gli aggiornamenti possono richiedere fino a 2 ore.
            Scopri di più sulla <span className='colorBlu fw-semibold'>condivisione delle modifiche del profilo</span>.</p>
        </div>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3 AddExpLabel" controlId="role">
              <Form.Label className='m-0 '>Qualifica</Form.Label>
              <Form.Control type="text" placeholder="Esempio: CTO" required value={role} onChange={(e) => {
                setRole(e.target.value);
              }} />
            </Form.Group>
            <Form.Group className="mb-3 AddExpLabel" controlId="company">
              <Form.Label className='m-0 '>Nome Azienda</Form.Label>
              <Form.Control type="text" placeholder="Esempio: EPICODE" required value={company} onChange={(e) => {
                setCompany(e.target.value);
              }} />
            </Form.Group>
            <Form.Group className="mb-3 AddExpLabel" controlId="area">
              <Form.Label className='m-0 '>Località</Form.Label>
              <Form.Control type="text" placeholder="Esempio: Italia, Lombardia, Milano" required value={area} onChange={(e) => {
                setArea(e.target.value);
              }} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="checkRole">
              <Form.Check type="checkbox" label="Attualmente ricopro questo ruolo" onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-3 AddExpLabel" controlId="startDate">
              <Form.Label className='m-0 '>Inizio:</Form.Label>
              <input type="date" className='d-block' required value={startDate} onChange={(e) => {
                setStartDate(e.target.value);
              }} />
            </Form.Group>
            <Form.Group className="mb-3 AddExpLabel" controlId="endDate">
              <Form.Label className='m-0 '>Fine:</Form.Label>
              <input type="date" className='d-block' disabled={checked} value={checked ? "" : endDate} onChange={(e) => { setEndDate(e.target.value); }} />
            </Form.Group>
            <Form.Group className="mb-3 AddExpLabel" controlId="description">
              <Form.Label className='m-0 ' >Descrizione</Form.Label >
              <Form.Control as="textarea" required value={description} onChange={(e) => {
                setDescription(e.target.value);
              }} />
            </Form.Group>
            <Button className='rounded-pill btn-blue' type="submit">
              Salva
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default AddExperience;