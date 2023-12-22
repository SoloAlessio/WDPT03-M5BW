import React, { useState } from 'react';
import { Button, Container, Row, Col, Form } from 'react-bootstrap';

const RegistrationForm = () => {
    // Stato per memorizzare i dati del modulo
    const [formData, setFormData] = useState({
        name: '',
        surname: '',
        email: '',
        password: '',
    });

    // Funzione per gestire i cambiamenti nei campi del modulo
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // Funzione per gestire l'invio del modulo
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(JSON.stringify(formData))

        const resp = await fetch("https://server-linkedin-project-test.onrender.com/api/profiles", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(
                formData
            ),
        })
        if (resp.ok) {
            alert("Utente registrato!")
            
        }
    };

    return (
        <Container>
            <Row>
                <Col xs={12} md={6}>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group>
                            <Form.Label>Nome</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Inserisci il tuo nome"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                            />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Inserisci la tua email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                            />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Username"
                                name="surname"
                                value={formData.surname}
                                onChange={handleInputChange}
                            />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Inserisci la tua password"
                                name="password"
                                value={formData.password}
                                onChange={handleInputChange}
                            />
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Registrati
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>

    );
};

export default RegistrationForm;
