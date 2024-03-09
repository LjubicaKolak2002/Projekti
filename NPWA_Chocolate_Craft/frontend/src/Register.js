import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [error, setError] = useState("")
    const navigate = useNavigate();

    
    function onChangeName(e) {
        setName(e.target.value);
    }
    function onChangeEmail(e) {
        setEmail(e.target.value);
    }
    
    function onChangePassword(e) {
        setPassword(e.target.value);
    }

    function onChangePassword2(e) {
        setPassword2(e.target.value);
    }
    
    function handleRegister(e) {
        e.preventDefault();

        if (name === "" || password === "" || email === "" || password2 === ""){
            setError("Sva polja su obavezna za unos");
            return;
        }

        if (password !== password2) {
            setError("Lozinke moraju biti jednake!");
            return;
        }

        fetch('http://localhost:3000/api/register', {
            method: "POST",
            body: JSON.stringify({
                name: name,
                email: email,
                password: password,
                "role": "user"
            }),
            headers: { "Content-Type": "application/json" }

        })
        .then((response) => response.json())
        .then((data) => {
            if (data){
                navigate("/login")
            } 
            else {
                setError("Error while trying register!")
            }
        })
    }

        
    return (

        <div className="register-container">
            <h3 className="registerTitle">Register</h3>
              <form className="register-form" onSubmit={(e) => handleRegister(e)}>
                <label htmlFor="name">Name</label>
                <input type="text" value={name} onChange={onChangeName} onBlur={onChangeName}></input>

                <label htmlFor="email">Email</label>
                <input type="text" value={email} onChange={onChangeEmail} onBlur={onChangeEmail}></input>
        
                <label htmlFor="password">Password</label>
                <input type="password" value={password} onChange={onChangePassword} onBlur={onChangePassword}></input>
        
                <label htmlFor="repeat password">Repeat Password</label>
                <input type="password" value={password2} onChange={onChangePassword2} onBlur={onChangePassword2} ></input>
        
                <button type="submit">Register</button>
                {error && <p className="error-message">{error}</p>}
              </form>
        </div>
    )
}
        
export default Register;