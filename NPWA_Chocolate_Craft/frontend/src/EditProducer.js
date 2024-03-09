import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import Navbar from "./Navbar"

const EditProducer = () => {
    const [name, setName] = useState("");
    const [year, setYear] = useState("");
    const [country, setCountry] = useState("");
    const [description, setDescription] = useState("");
    const [logo, setLogo] = useState([]); 
    const [error, setError] = useState("");
    const [producer, setProducer] = useState("");

    const navigate = useNavigate();
    const params = useParams();
    const token = localStorage.getItem("token");

    if (!token) {
        window.location.href = "/login";
    }

    const options = {headers:{
        Authorization: "Bearer " + localStorage.getItem("token")
    }};


    async function getProducer() {
        const producer = await fetch(`http://localhost:3000/api/producerDetails/${params.producer_id}`, options)
        const producerJson = await producer.json();
        const producerResult = await producerJson;
        setProducer(producerResult)
        
        setName(producerResult.name);
        setYear(producerResult.year);
        setCountry(producerResult.country);
        setDescription(producerResult.description);
        setLogo(producerResult.logo);
    }


    async function updateData(e) {
        e.preventDefault();
    
        if (name === "" || year === "" || country === "" || description === "" || logo === "") {
            setError("Sva polja su obavezna za unos");
            return;
        }
    
        fetch(`http://localhost:3000/api/editProducer/${params.producer_id}`, {
            method: "PUT",
            body: JSON.stringify({
                name: name,
                year: year,
                country: country,
                description: description,
                logo: logo
            }),
            headers: {
                "Content-Type": "application/json;charset=UTF-8",
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        })
        .then((response) => response.json())
        .then((data) => {
            if (data) {
                navigate("/producers");
            } else {
                setError("Greska prilikom ažuriranja!");
            }
        });
    }
    

    useEffect(() => {
        getProducer();
    }, [])

    return (
        <>
          <Navbar></Navbar>
            <div className="addContainer">
                <div className="formContainer">
                    <h3>Ažuriraj proizvođača</h3>
                    <form>
                        <input type="text" defaultValue={name}  onChange={(e) => setName(e.target.value)} required/><br/>
                        <input type="text" defaultValue={year}  onChange={(e) => setYear(e.target.value)} required/><br/>
                        <input type="text" defaultValue={country}  onChange={(e) => setCountry(e.target.value)} required/><br/>
                        <textarea type="text" defaultValue={description}  onChange={(e) => setDescription(e.target.value)} required/><br/>
                        <input type="text" defaultValue={logo}  onChange={(e) => setLogo(e.target.value)} required/><br/>
                   
                        <button type="submit" onClick={updateData}>Save</button>

                    </form>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                </div>
            </div>
        </>
    )

}

export default EditProducer;