import React, { useState } from 'react';
import { Container, Form, Row, Col, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate("")

    const handleLogin = async (e) => {
        e.preventDefault()
        //inserire controllo campi vuoti
        //qui inseriremo il nostro server

        const response = await fetch("https://server-linkedin-project-test.onrender.com/api/profiles/login", {

            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email,
                password,
            }),
        })

        const data = await response.json()

        console.log(data)
        if (data) {
            // localStorage.setItem("userId", userId)
            localStorage.setItem("token", data.token)
            navigate("/profile")
        }
        else {
            alert("nessun token")
        }
    };

    return (
        <Container>
            <Row>
                <Col xs={12} md={6}>
                    <Form onSubmit={handleLogin} className='mt-2'>
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

                        <Button variant="primary" type="submit" className='me-3'>
                            Login
                        </Button>

                        <Link to="/registration">
                            <Button variant="primary" className='m-3'>
                                Registrati
                            </Button>
                        </Link>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default LoginForm;