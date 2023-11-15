import { useState } from 'react';
import {Button, Modal, Form} from 'react-bootstrap';
import "./AddExperience.scss"

function Example() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [checked, setChecked] = useState(false);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  }

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button>

      <Modal show={show} onHide={handleClose} className='ModalExp'>
        <Modal.Header closeButton>
          <Modal.Title>Aggiungi Esperienza</Modal.Title>
        </Modal.Header>
        <div style={{background: "#EDF3F8", padding: "1rem"}}>
            <h2 className='fs-7'>Informa la rete</h2>
            <p className='m-0 AddExpLabel' style={{fontSize: 14}}>Attiva l’opzione per informare la tua rete delle principali modifiche al profilo 
              (ad esempio un nuovo lavoro) e degli anniversari lavorativi. Gli aggiornamenti possono richiedere fino a 2 ore. 
              Scopri di più sulla <span className='colorBlu fw-semibold'>condivisione delle modifiche del profilo</span>.</p>
          </div>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3 AddExpLabel" controlId="formBasicEmail">
              <Form.Label className='m-0 '>Qualifica</Form.Label>
              <Form.Control type="text" placeholder="Esempio: CTO" />
            </Form.Group>
            <Form.Group className="mb-3 AddExpLabel" controlId="formBasicEmail">
              <Form.Label className='m-0 '>Nome Azienda</Form.Label>
              <Form.Control type="text" placeholder="Esempio: EPICODE" />
            </Form.Group>
            <Form.Group className="mb-3 AddExpLabel" controlId="formBasicEmail">
              <Form.Label className='m-0 '>Descrizione</Form.Label>
              <Form.Control as="textarea"  />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="Attualmente ricopro questo ruolo" onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-3 AddExpLabel" controlId="formBasicEmail">
              <Form.Label className='m-0 '>Inizio:</Form.Label>
              <input type="date" className='d-block'/>
            </Form.Group>
            <Form.Group className="mb-3 AddExpLabel" controlId="formBasicEmail">
              <Form.Label className='m-0 '>Fine:</Form.Label>
              <input type="date" className='d-block' disabled={checked}/>
            </Form.Group>
            
            <Form.Group className="mb-3 AddExpLabel" controlId="formBasicEmail">
              <Form.Label className='m-0 '>Località</Form.Label>
              <Form.Control type="text" placeholder="Esempio: Italia, Lombardia, Milano" />
            </Form.Group>
            
            <Button className='btn-blue' type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Example;