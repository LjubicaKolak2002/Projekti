import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";


const Navbar = () => {
    const [userName, setUserName] = useState("")
    const [userRole, setUserRole] = useState("")
    const [userId, setUserId] = useState("")
    const [showAdminDropdown, setShowAdminDropdown] = useState(false);

    const userString = localStorage.getItem("user");

    const toggleAdminDropdown = () => {
        setShowAdminDropdown(!showAdminDropdown);
    }

    useEffect(() => {
      if (userString) {
          const user = JSON.parse(userString);
          const userName = user.name;
          const id = user.id
          setUserId(id)
          setUserName(userName);
            
          const userRole = user.role;
          setUserRole(userRole)
      }
    }, [])


    return (
      <>
          <div className="header"><span className="homeTitle">Chocolate Craft</span></div>
          <div className="navbar">
            <Link to="/">Home</Link>
            <Link to="/producers">Producers</Link>
            
      
            {userRole === "admin" ? (
              <>
                <div className="dropdown" onClick={toggleAdminDropdown}>
                    <span>New</span>
                    {showAdminDropdown && (
                        <div className="dropdown-content">
                          <Link to="/addChocolate">New product</Link>
                          <Link to="/addProducer">New producer</Link>
                        </div>
                    )}
                </div>
                
                <span className="userName">{userName}</span>
                <Link to="/logout" className="logout">Logout</Link>
              </>
            ) : (
              <>
                <Link to={`/favourites/${userId}`}>My favourites</Link>
                <Link to="/cart">My cart</Link>
                <span className="userName2">{userName}</span>
                <Link to="/logout" className="logout2">Logout</Link>
              </>
          )}
        </div>
      </>
    )
}
    
export default Navbar;