import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import Navbar from "./Navbar";


const ProducerDetails = () => {
    const [producer, setProducer] = useState("");
    const params = useParams();

    const token = localStorage.getItem("token");

    if (!token) {
        window.location.href = "/login";
    }

    const options = {headers:{
        Authorization: "Bearer " + localStorage.getItem("token")
    }}

    async function getProducerById() {
        const producer = await fetch(`http://localhost:3000/api/producerDetails/${params.producer_id}`, options)
        const producerJson = await producer.json();
        const producerResult = await producerJson;
        setProducer(producerResult);
    }

    useEffect(() => {
        getProducerById();
    }, [])


    return (
        <>
            <Navbar></Navbar>
            <div className="producerContainer">
                <img src={producer.logo} alt="Producer Logo" className="logoProducer" /><br/><br/><br/>
                <div className="producerDescription">{producer.description}</div><br/>
                <span className="producerYear">Godina osnivanja: {producer.year}</span><br/>
                <span className="producerCountry">Zemlja: {producer.country}</span><br/>
            </div>
        </>
    )

}

export default ProducerDetails;