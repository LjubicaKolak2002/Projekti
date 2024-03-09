import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import Navbar from "./Navbar";

const Favourite = () => {
  const [favourites, setFavourites] = useState([]);
  const [products, setProducts] = useState("");
  const token = localStorage.getItem("token");

  if (!token) {
    window.location.href = "/login";
  }

  const params = useParams();
  const options = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token")
    }
  };

  
  async function getFavs() {
    const favourites = await fetch(`http://localhost:3000/api/userFavourites/${params.user_id}`, options);
    const json = await favourites.json();
    setFavourites(json);
  }

  async function getChocolates() {
    const chocolates = await fetch("http://localhost:3000/api/chocolates", options);
    const json = await chocolates.json();
    setProducts(json);
  }

  async function deleteFavourite(id){
    const requestOptions = {
      method: 'DELETE',
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      }
    }
    fetch(`http://localhost:3000/api/deleteFavourite/${id}/${params.user_id}`,requestOptions)
    .then((res) => res.json())
    .then((data) => {
        if (data.deletedFav) {
          window.location.href = `/favourites/${params.user_id}`;
        } 
        else {
          alert("Can not delete")
        }
    })
  }

  useEffect(() => {
    getChocolates();
    getFavs();
  }, [favourites]);

  return (
    <>
      <Navbar />
      <div className="favourites-container">
          <br/><h2 className="favourites-title">My Favourites:</h2><br/>
          <ul className="favourites-list">
          {favourites.map((favourite) => {
              const matchingProduct = products.find((product) => product._id === favourite.product_id);
                return (
                        <li key={favourite._id} className="favourite-item">
                            {matchingProduct && (
                            <>
                              <span className="product-image"><img src={matchingProduct.image} alt={matchingProduct.name} width="250px" /></span>
                              <span className="product-name">{matchingProduct.name}</span><br/>
                              <button className="deleteFavourite" type="submit" onClick={() => deleteFavourite(favourite.product_id)}>Remove</button><br/>
                          </>
                      )}
                    </li>
                );
              })}
          </ul>
      </div>
    </>
  );
};

export default Favourite;