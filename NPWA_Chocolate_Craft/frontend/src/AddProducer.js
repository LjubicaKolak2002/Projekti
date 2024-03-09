import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar"

const AddProducer = () => {
    const [name, setName] = useState("");
    const [year, setYear] = useState("");
    const [country, setCountry] = useState("");
    const [description, setDescription] = useState("");
    const [logo, setLogo] = useState([]); 
    const [error, setError] = useState("");
    const token = localStorage.getItem("token");

    if (!token) {
        window.location.href = "/login";
    }
    const navigate = useNavigate()
    
    async function addData(e) {
        e.preventDefault(); 

        if (name == "" || year == "" || country == "" ||  logo == "" ) {
            setError("Ime, godina, država i logo su obavezni za unos");
            return;
        }
        fetch('http://localhost:3000/api/addProducer', {
            method: "POST",
            body: JSON.stringify({
                name: name,
                year: year,
                country: country,
                description: description,
                logo: logo
            }),
            headers: { 
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        })
        .then((response) => response.json())
        .then((data) => {
            if (data){
                navigate("/producers")
            }
            else {
                setError("Greska prilikom dodavanja!")
            }
        })
    }


    return (
        <>
            <Navbar></Navbar>
                <div className="addContainer">
                    <div className="formContainer">
                        <h3>Novi proizvođač</h3>
                        <form>
                            <input type="text" value={name}  placeholder="Naziv proizvođača" onChange={(e) => setName(e.target.value)} required/><br/>
                            <input type="number"  value={year} placeholder="Godina osnivanja" onChange={(e) => setYear(e.target.value)} required/><br/>
                            <input type="text" value={country}  placeholder="Država" onChange={(e) => setCountry(e.target.value)} required/><br/>
                            <textarea type="text" value={description} placeholder="Opis" onChange={(e) => setDescription(e.target.value)}/><br/>
                            <input type="text" value={logo} placeholder="Url na logo" onChange={(e) => setLogo(e.target.value)} required/><br/>

                            <button type="submit" onClick={addData} >Save</button>
                        </form>
                        {error && <p style={{ color: 'red' }}>{error}</p>}
                </div>
            </div>
        </>
    )
}

export default AddProducer;