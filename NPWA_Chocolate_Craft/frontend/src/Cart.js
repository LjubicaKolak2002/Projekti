import React, { useContext } from "react";
import Context from "./CartContext";
import Navbar from "./Navbar";

const Cart = () => {
  const [cart, setCart] = useContext(Context);

  function totalQuantity() {
    return cart.reduce(function (total, item) {
      return total + item.quantities;
    }, 0);
  }
  
  function totalPrice() {
    const total = cart.reduce(function (acc, item) {
      const parsedPrice = parseFloat(
        item.price.replace("€", "").replace(",", ".").trim()
      );
      return acc + parsedPrice * item.quantities;
    }, 0);
    
    return total.toFixed(2);
  }
  
  function removeAll() {
    setCart([]);
  }
  
  function removeItem(productId) {
    const newCart = cart.map(function (product) {
        if (product._id === productId) {
          if (product.quantities > 1) {
            return { ...product, quantities: product.quantities - 1 };
          }
          else {
            return null;
          }
        }
        return product;
      })
      .filter(Boolean);
  
    setCart(newCart);
  }
  
  function addItem(productId) {
    const newCart = cart.map(function (product) {
      if (product._id === productId) {
        return { ...product, quantities: product.quantities + 1 };
      }
      return product;
    });
  
    setCart(newCart);
  }
  

  
  return (
    <>
      <Navbar></Navbar>
      <div className="cartContainer"><br/><br/>
        <h2 className="cartTitle">My cart</h2><br/><br/>
            <div className="cartItemsContainer">
                {cart.map((item) => (
                    <div key={item._id} className="cartItem">
                        <div className="cartItemDetails">
                            <div>
                                <strong>{item.name}</strong>
                            </div><br/>
                            <div className="cartPrice"><strong>{item.price}</strong>€</div>
                                <div>Količina: {item.quantities}</div>
                                <div className="cartButtons">
                                    <button onClick={() => addItem(item._id)}>+</button>
                                    <button onClick={() => removeItem(item._id)}>-</button>
                                </div>
                            </div>
                            <div className="cartItemImage">
                                <img src={item.image} alt={item.name} />
                            </div>
                        </div>
                  ))}
              </div>
        
        <div className="cartSummary">
          <div>
            <strong>Ukupno proizvoda: {totalQuantity()}</strong>
          </div>
          <div>
            <strong>Ukupna cijena: {totalPrice()} €</strong>
          </div>
          <button onClick={removeAll}>Remove all</button>
        </div>
      </div>
    </>
  );
};

export default Cart;
