import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar"

const AddProduct = () => {
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
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    if (!token) {
        window.location.href = "/login";
    }
  
    const options = {headers:{
        Authorization: "Bearer " + localStorage.getItem("token")
    }};

    async function getTypesProducers() {
        const types = await fetch('http://localhost:3000/api/chocolateTypes', options);
        const jsonTypes = await types.json();
        setTypes(jsonTypes);

        const producers = await fetch('http://localhost:3000/api/producers', options);
        const jsonProducers = await producers.json();
        setProducers(jsonProducers);
    }

    async function addData(e) {
        e.preventDefault(); 

        if (name == "" || price == "" || image == "" || cacao == "" || milk == "" || color == "" || type == "" || producer == "") {
            setError("Sva polja su obavezna za unos");
            return;
        }

        fetch('http://localhost:3000/api/addChocolate', {
            method: "POST",
            body: JSON.stringify({
                name: name,
                price: price,
                image: image,
                cacao: cacao,
                milk: milk,
                color: color,
                type_id: type,
                producer_id: producer

            }),
            headers: { 
                "Content-Type": "application/json",
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
        getTypesProducers();
    }, [])

    return (
        <>
            <Navbar></Navbar>
            <br/><br/><br/><br/>
            <div className="addContainer">
                <div className="formContainer">
                    <h3>Novi proizvod</h3>
                    <form>
                        <input type="text" value={name}  placeholder="Naziv proizvoda" onChange={(e) => setName(e.target.value)} required/><br/>
                        <input type="number" step="0.01" value={price} placeholder="Cijena proizvoda" onChange={(e) => setPrice(e.target.value)} required/><br/>
                        <input type="text" value={image}  placeholder="Url slike" onChange={(e) => setImage(e.target.value)} required/><br/>
                        <input type="text" value={cacao} placeholder="Udio kakaa" onChange={(e) => setCacao(e.target.value)} required/><br/>
                        <input type="text" value={milk} placeholder="Udio mlijeka" onChange={(e) => setMilk(e.target.value)} required/><br/>
                        <input type="text" value={color} placeholder="Boja proizvoda" onChange={(e) => setColor(e.target.value)} required/><br/>

                        <label>Tip proizvoda:
                            <select onChange={(e) => setType(e.target.value)}>
                                <option>All</option>
                                {types.map((type) => (
                                    <option key={type._id} value={type._id}>{type.name}</option>
                                ))}
                            </select>
                        </label><br/><br/>

                        <label>Proizvođač:
                            <select onChange={(e) => setProducer(e.target.value)}>
                                <option>All</option>
                                {producers.map((producer) => (
                                    <option key={producer._id} value={producer._id}>{producer.name}</option>
                                ))}
                            </select>
                        </label><br/><br/>

                        <button type="submit" onClick={addData} >Save</button>
                    </form>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                </div>
            </div>
        </>
    )
}

export default AddProduct;