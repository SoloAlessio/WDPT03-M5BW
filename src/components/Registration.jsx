import React, { useState } from 'react';
import { Button, Container, Row, Col, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';


const RegistrationForm = () => {
    // Stato per memorizzare i dati del modulo
    const [formData, setFormData] = useState({
        name: '',
        surname: '',
        email: '',
        password: '',
        area: '',
        title: ''
    });

    // Funzione per gestire i cambiamenti nei campi del modulo
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const navigate = useNavigate("")
    // Funzione per gestire l'invio del modulo
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(JSON.stringify(formData))
        //ricerco il profilo con l'email inserita
        const allProfiles = await fetch("https://server-linkedin-project-test.onrender.com/api/profiles", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
        if (allProfiles.ok) {
            const allProfilesJson = await allProfiles.json()
            const profile = allProfilesJson.find((profile) => profile.email === formData.email)
            if (!profile) {

                const resp = await fetch("https://server-linkedin-project-test.onrender.com/api/profiles", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(
                        formData
                    ),
                })
                if (resp.ok) {//se la risposta è ok
                    const userAndToken = await resp.json()
                    alert("Utente registrato!")
                    localStorage.setItem("token", userAndToken.token)
                    console.log(resp.token)
                    navigate("/profile")
                }
            } else {
                alert("Utente già registrato, effettua il login")
                navigate("/")
            }
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
                            <Form.Label>Area</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Area"
                                name="area"
                                value={formData.area}
                                onChange={handleInputChange}
                            />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Ruolo ricoperto"
                                name="title"
                                value={formData.title}
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

                        <Button variant="primary" type="submit" className='mt-2'>
                            Registrati
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>

    );
};

export default RegistrationForm;
