import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import { FaEdit, FaTrashAlt } from 'react-icons/fa';

const Producer = () => {
  const [producers, setProducers] = useState([]);
  const [errorMap, setErrorMap] = useState({});
  const [role, setRole] = useState("");
  const userString = localStorage.getItem("user");
  const token = localStorage.getItem("token");

  const options = {headers:{
    Authorization: "Bearer " + localStorage.getItem("token")
  }}

  if (!token) {
    window.location.href = "/login";
  }

  async function getProducers() {
    const response = await fetch("http://localhost:3000/api/producers", options);
    const json = await response.json();
    setProducers(json);
  }


  function deleteProducer(producerId) {
    return fetch(`http://localhost:3000/api/deleteProducer/${producerId}`, {
      method: 'DELETE',
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token")
      }
    })
    .then((res) => res.json())
    .then((data) => {
      if (data.producer) {
        setProducers(prevProducers =>
          prevProducers.filter(producer => producer._id !== producerId)
        )
      }
      else {
        setErrorMap(prevErrorMap => ({
          ...prevErrorMap,
          [producerId]: "Ne može se izbrisati ovaj proizvođač"
        }))
      }
    })
    .catch(() => {
        setErrorMap(prevErrorMap => ({
          ...prevErrorMap,
          [producerId]: "Proizvođač se ne može obrisati"
        }))
      })
  }

  useEffect(() => {
    getProducers();
    if (userString) {
      const user = JSON.parse(userString);
      const userRole = user.role;
      setRole(userRole);
    }
  }, []);

  return (
    <>
      <Navbar></Navbar>
      <h1 className="producersHeading">Our producers</h1>
      <div className="producersDiv">
          {producers.map((producer) => (
              <div className="oneProducerDiv" key={producer._id}>
                  <Link to={`/producerDetails/${producer._id}`}>
                      <img src={producer.logo} alt="producerLogo" className="producerLogoImage" />
                  </Link><br/><br/>
                  
                  <span className="producerText">Click on logo and see details!</span>
  
                  {role === "admin" && (
                      <div className="iconContainer">
                          <Link to={`/editProducer/${producer._id}`} className="iconLink">
                              <FaEdit className="editIcon" />
                          </Link>

                          <button className="deleteIcon2" type="submit" onClick={() => deleteProducer(producer._id)}>
                              <FaTrashAlt className="deleteIcon" />
                          </button>
                      </div>
                  )}

                  {errorMap[producer._id] && (
                      <p className="errorText">{errorMap[producer._id]}</p>
                  )}
              </div>
          ))}
      </div>
    </>
  )
}  
  

export default Producer;
