import React, { useState, useEffect, useContext } from "react";
import { useParams } from 'react-router-dom';
import Context from "./CartContext";
import Navbar from "./Navbar";


const ProductDetails = () => {
    const [product, setProduct] = useState("");
    const [producer, setProducer] = useState("");
    const [type, setType] = useState("");
    const [role, setRole] = useState("");
    const [cart, setCart] = useContext(Context);
    const userString = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    const params = useParams();

    if (!token) {
        window.location.href = "/login";
    }
    
    const options = {
        headers: {
            Authorization: "Bearer " + localStorage.getItem("token")
        }
    }

    async function getProduct() {
        const productResponse = await fetch(`http://localhost:3000/api/chocolateDetails/${params.chocolate_id}`, options);
        const productJson = await productResponse.json();
        productJson.quantities = 1;
        setProduct(productJson);

        const producerResponse = await fetch(`http://localhost:3000/api/producerDetails/${productJson.producer_id}`, options);
        const producerJson = await producerResponse.json();
        setProducer(producerJson);

        const typeResponse = await fetch(`http://localhost:3000/api/chocolateType/${productJson.type_id}`, options);
        const typeJson = await typeResponse.json();
        setType(typeJson);
    }
    

    function addToCart() {
      if (!product || !cart || !setCart) {
        //console.error("Nedostaju potrebni podaci.");
        return;
      }
    
      setCart((prevCart) => {
        const foundItem = prevCart.find((item) => item._id === product._id);
    
        if (foundItem) {
            foundItem.quantities += 1;
            return [...prevCart]; 
        }
        else {
            const newProduct = { ...product, quantities: 1 };
            return [...prevCart, newProduct]; 
        }
      })
    }

    useEffect(() => {
        getProduct();
        if (userString) {
            const user = JSON.parse(userString);
            const userRole = user.role;
            setRole(userRole);
        }
    }, []);


    return (
        <>
            <Navbar></Navbar>
            <div className="productDetails">
                <div className="leftColumnDetails">
                    <img src={product.image} alt="chocolateImage" className="imageDetails" />
                </div>
                <div className="rightColumnDetails">
                    <h3 className="productName">{product.name}</h3>
                    <p className="productPrice">{product.price} €</p>
                    <p className="productInfo">Udio kakaa: {product.cacao_percentage}</p>
                    <p className="productInfo">Udio mlijeka: {product.milk_percentage}</p>
                    <p className="productInfo">Boja: {product.color}</p>
                    <p className="productInfo">Tip: {type.name}</p>
                    <p className="productInfo">Proizvođač: {producer.name}</p>
                </div>
            </div>

            { role == "user" && (
                <button onClick={addToCart} className="cartButton">Add to cart</button>
            )}
        </>
    );
}

export default ProductDetails;
