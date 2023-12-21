import React, { useState } from 'react';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [allProfile, setAllProfile] = useState('');
    const [token,setToken]=useState('')

    const handleLogin=function(e) {
        e.preventDefault()
        //inserire controllo campi vuoti
        //qui inseriremo il nostro server
        fetch("http://localhost:3030/api/profiles", {  //cerco se l'utente è registrato
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
                    .then(setToken)
                    console.log(token)
                    if (token) {
                        // localStorage.setItem("userId", userId)
                        localStorage.setItem("token", token)
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
        <div className="container mt-5">
            <h2>Login</h2>
            <form>
                <div className="form-group">
                    <label>Email address</label>
                    <input
                        type="email"
                        className="form-control"
                        placeholder="Enter email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input
                        type="password"
                        className="form-control"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <button type="button" className="btn btn-primary" onClick={handleLogin}>
                    Login
                </button>
            </form>
        </div>
    );
};

export default LoginForm;
