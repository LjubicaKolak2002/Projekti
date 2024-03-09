import React, {useState} from "react";
import { render } from "react-dom";
import Home from "./Home";
import ProductDetails from "./ProductDetails";
import Producer from "./Producer";
import ProducerDetails from "./ProducerDetails";
import AddProduct from "./AddProduct";
import AddProducer from "./AddProducer";
import EditProduct from "./EditProduct";
import EditProducer from "./EditProducer";
import Register from "./Register";
import Login from "/Login";
import Logout from "./Logout";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Context from "./CartContext";
import Cart from "./Cart";
import Favourite from "./Favourites";

const App = () => {
  const cart = useState([])
  return (
    <div>
      <Context.Provider value={cart}>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/chocolateDetails/:chocolate_id" element={<ProductDetails />} />
            <Route path="/producers" element={<Producer/>}/>
            <Route path="/producerDetails/:producer_id" element={<ProducerDetails/>} />
            <Route path="/addChocolate" element={<AddProduct/>}/>
            <Route path="/addProducer" element={<AddProducer/>}/>
            <Route path="/editChocolate/:chocolate_id" element={<EditProduct/>}/>
            <Route path="/editProducer/:producer_id" element={<EditProducer/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/logout" element={<Logout/>}/>
            <Route path="/cart" element={<Cart/>}/>
            <Route path="/favourites/:user_id" element={<Favourite/>}/>
          </Routes>
        </Router>
      </Context.Provider>
    </div>
  );
};

render(<App />, document.getElementById("root"));

