import React, { useState, useEffect} from "react";
import { Link} from "react-router-dom";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import Navbar from "./Navbar";
import { FaEdit, FaTrashAlt } from 'react-icons/fa';


const Home = () => {
  const [chocolates, setChocolates] = useState([]);
  const [producers, setProducers] = useState([]);
  const [role, setRole] = useState("");
  const [favourites, setFavourites] = useState([]);

  const userString = localStorage.getItem("user");
  const token = localStorage.getItem("token");


  const options = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  };

  if (!token) {
    window.location.href = "/login";
  }

  async function getChocolates() {
    const chocolates = await fetch("http://localhost:3000/api/chocolates", options);
    const json = await chocolates.json();
    setChocolates(json);
  }


  async function getProducers() {
    const producers = await fetch("http://localhost:3000/api/producers", options);
    const jsonProducers = await producers.json();
    setProducers(jsonProducers);
  }


  async function deleteChocolate(id) {
    const requestOptions = {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      }
    }

    fetch(`http://localhost:3000/api/deleteChocolate/${id}`, requestOptions)
      .then((res) => res.json())
      .then((data) => {
        if (data.deletedChocolate) {
          window.location.href = '/';
        } 
        else {
          alert("Cannot delete");
        }
      })
  }

  function addToFavourites(product) {
    const user = JSON.parse(localStorage.getItem("user"));

    fetch("http://localhost:3000/api/addFavourite", {
      method: "POST",
      body: JSON.stringify({
        product_id: product._id,
        user_id: user.id,
      }),
      headers: {
          "Content-type": "application/json;charset=UTF-8",
           Authorization: "Bearer " + localStorage.getItem("token"),
      }
    })
    .then((resp) => resp.json())
    .then((data) => {
      console.log("Success!");
      //navigate("/");
    })
    .catch((err) => console.log(err));
  }


  async function getFavs() {
    const user = JSON.parse(localStorage.getItem("user"));
    const favourites = await fetch(`http://localhost:3000/api/userFavourites/${user.id}`, options);
    const json = await favourites.json();
    setFavourites(json);
  }


  function isFavourite(product){
    for (let item in favourites) {
      if (favourites[item].product_id === product._id) {
        return true;
      }
    }
    return false;
  }


  async function deleteFavourite(id){
    const user = JSON.parse(localStorage.getItem("user"));

    const requestOptions = {
        method: 'DELETE',
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        }
      }
      fetch(`http://localhost:3000/api/deleteFavourite/${id}/${user.id}`, requestOptions)
      .then((res) => res.json())
      .then((data) => {
         if (data.deletedFav) {
            console.log("Success")
          }
          else {
            alert("Can not delete")
          }
    })
  }
  

  useEffect(() => {
    getChocolates();
    getProducers();
    getFavs();

    if (userString) {
      const user = JSON.parse(userString);
      const userRole = user.role;
      setRole(userRole);
    }
  }, [favourites]);

 
  return (
    <>
      <Navbar></Navbar>
      <div className="chocolatesDiv">
        {producers.map((producer) => (
          <div key={producer._id} className="producerContainer">
            <h2 className="producerName">{producer.name}</h2>
              <div className="chocolatesRow">
                  {chocolates.filter((chocolate) => chocolate.producer_id === producer._id)
                      .map((chocolate) => (
                      <div key={chocolate._id} className="chocolateItem">
                          <div className="chocolateInfo">
                              <img src={chocolate.image} alt="chocolateImage" className="chocolateImage"/>
                              <h3 className="chocolateName">{chocolate.name}</h3>
                              <strong>{chocolate.price}€</strong>
                              <br/>
                              <br/>

                              {role === "admin" ? (
                              <>
                                  <Link to={`/chocolateDetails/${chocolate._id}`}>
                                      <button>Details</button>
                                  </Link><br/><br/>

                                  <Link to={`/editChocolate/${chocolate._id}`}>
                                      <FaEdit className="editIcon" />
                                  </Link>
                          
                                  <button type="submit" onClick={() => deleteChocolate(chocolate._id)} className="deleteButonIcon">
                                      <FaTrashAlt className="deleteIcon" />
                                  </button>
                              </>
                            ):
                            <>
                                <Link to={`/chocolateDetails/${chocolate._id}`}>
                                    <button>Details</button><br/>
                                </Link>
                                
                                <button type="submit" 
                                  style={{
                                    color: isFavourite(chocolate) ? "red" : "#ff1aff",
                                    background: "#f9f9f9",
                                  }}
                                  onClick={() => 
                                    (isFavourite(chocolate) 
                                      ? deleteFavourite(chocolate._id) : 
                                      addToFavourites(chocolate)
                                    )}
                                  >
                                {isFavourite(chocolate) ? (<FaHeart size={25} /> ) : (<FaRegHeart size={22} />)}
                              </button>
                          </> }
                  </div>
                  <br/>
                  <br/>
                </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Home