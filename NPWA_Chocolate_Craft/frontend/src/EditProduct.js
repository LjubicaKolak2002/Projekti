import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import Navbar from "./Navbar";

const EditProduct = () => {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [image, setImage] = useState("");
    const [cacao, setCacao] = useState("");
    const [milk, setMilk] = useState("");
    const [color, setColor] = useState("");
    const [types, setTypes] = useState([]);
    const [type, setType] = useState("")
    const [producers, setProducers] = useState([]);
    const [producer, setProducer] = useState("");
    const [error, setError] = useState("");
    const [chocolate, setChocolate] = useState("");

    const navigate = useNavigate();
    const params = useParams();
    const token = localStorage.getItem("token");

    if (!token) {
        window.location.href = "/login";
    }

    const options = {headers:{
        Authorization: "Bearer " + localStorage.getItem("token")
    }};

    async function getProduct() {
        const product = await fetch(`http://localhost:3000/api/chocolateDetails/${params.chocolate_id}`, options)
        const productJson = await product.json();
        const productResult = await productJson;

        setChocolate(productResult)
        setName(productResult.name);
        setPrice(productResult.price);
        setImage(productResult.image);
        setCacao(productResult.cacao_percentage);
        setMilk(productResult.milk_percentage);
        setColor(productResult.color);
        
        const producer = await fetch("http://localhost:3000/api/producers", options);
        const producerJson = await producer.json();
        const producerResult = await producerJson;
        setProducers(producerResult)

        const type = await fetch("http://localhost:3000/api/chocolateTypes", options);
        const typeJson = await type.json();
        const typeResult = await typeJson;
        setTypes(typeResult)
        
        setType(productResult.type_id);
        setProducer(productResult.producer_id);
        
    }

    async function updateData(e) {
        e.preventDefault();
    
        if (name == "" || price == "" || image == "" || cacao == "" || milk == "" || color == "" || type == "" || producer == "") {
            setError("Sva polja su obavezna za unos");
            return;
        }
       
        fetch(`http://localhost:3000/api/editChocolate/${params.chocolate_id}`, {
            method: "PUT",
            body: JSON.stringify({
                name: name,
                price: price,
                image: image,
                cacao_percentage: cacao,
                milk_percentage: milk,
                color: color,
                type_id: type,
                producer_id: producer
            }),
            headers: {
                "Content-Type": "application/json;charset=UTF-8",
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        })
        .then((response) => response.json())
        .then((data) => {
            if (data){
                navigate("/")
            } 
            else {
                setError("Greska prilikom dodavanja!")
            }
        })
    }


    useEffect(() => {
        getProduct();
    }, [])


    return (
        <>
          <Navbar></Navbar>
            <br/><br/><br/><br/>
            <div className="addContainer">
                <div className="formContainer">
                    <h3>Ažuriraj proizvod</h3>
                    <form>
                        <input type="text" defaultValue={name}  placeholder="Naziv proizvoda" onChange={(e) => setName(e.target.value)} required/><br/>
                        <input type="text" defaultValue={price} placeholder="Cijena proizvoda" onChange={(e) => setPrice(e.target.value)} required/><br/>
                        <input type="text" defaultValue={image}  placeholder="Url slike" onChange={(e) => setImage(e.target.value)} required/><br/>
                        <input type="text" defaultValue={cacao} placeholder="Udio kakaa" onChange={(e) => setCacao(e.target.value)} required/><br/>
                        <input type="text" defaultValue={milk} placeholder="Udio mlijeka" onChange={(e) => setMilk(e.target.value)} required/><br/>
                        <input type="text" defaultValue={color} placeholder="Boja proizvoda" onChange={(e) => setColor(e.target.value)} required/><br/>

                        <label>Tip proizvoda:
                            <select onChange={(e) => setType(e.target.value)}>
                                <option>All</option>
                                {types.map((chocoType) => (
                                    <option key={chocoType._id} value={chocoType._id} selected={chocoType._id === type}>{chocoType.name}</option>
                                ))}
                            </select>
                        </label><br/><br/>

                        <label>Proizvođač:
                            <select onChange={(e) => setProducer(e.target.value)}>
                                <option>All</option>
                                {producers.map((chocoProducer) => (
                                    <option key={chocoProducer._id} value={chocoProducer._id} selected={chocoProducer._id === producer}>{chocoProducer.name}</option>
                                ))}
                            </select>
                        </label><br/><br/>

                        <button type="submit" onClick={updateData} >Save</button>
                    </form>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                </div>
            </div>
        </>
    )

}

export default EditProduct;