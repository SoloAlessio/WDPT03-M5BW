import React, { useState } from 'react';
import { Container, Form, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [allProfile, setAllProfile] = useState('');
    const [dataauth, setdataauth] = useState('')
    const navigate=useNavigate("")

    const handleLogin = async (e)=> {
        e.preventDefault()
        //inserire controllo campi vuoti
        //qui inseriremo il nostro server
        await fetch("http://localhost:3030/api/profiles", {  //cerco se l'utente è registrato
        })
            .then((r) => r.json())
            .then(setAllProfile)

        if (allProfile) { 
            const user = allProfile.find((e) => e.email === email)
            console.log(user)
            if (user) {
                fetch("http://localhost:3030/api/profiles/login", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        email,
                        password,
                    }),
                }).then((r) => r.json())
                    .then(setdataauth)
                console.log(dataauth.token)
                if (dataauth) {
                    // localStorage.setItem("userId", userId)
                    localStorage.setItem("token", dataauth.token)
                    navigate("/profile")
                }
            }
            else {
                alert("Nessun utente trovato, registrati!")
            }
        } else {
            alert("Non ho trovato utenti nel db - allProfile vuoto")
        }
    };

    return (
        <Container>
            <Row>
                <Col xs={12} md={6}>
                    <Form onSubmit={handleLogin}>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Inserisci la tua email"
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Inserisci la tua password"
                                name="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Form.Group>
                        
                        <Button variant="primary" type="submit">
                            Login
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default LoginForm;
