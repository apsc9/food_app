import { LOGO_URL } from "../utils/constants";
import { useState, useContext }  from "react";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import UserContext from "../utils/UserContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";

const Header = () => {
    const [btnName, setBtnName] = useState("Login");
    const onlineStatus = useOnlineStatus();

    const { loggedInUser } = useContext(UserContext);
    //console.log(loggedInUser);

    // subscribe to the store using selector
    const cartItems = useSelector((store) => store.cart.items);

    // console.log(cartItems);
    // if (loggedInUser) {
    //     setBtnName("Logout");
    // }
    
    return (
        <div className="flex justify-between bg-pink-100 shadow-lg m-2">
            <div className="logo-container">
                <img 
                    className="w-56"
                    src={LOGO_URL}
                />
            </div>
            <div className="flex items-center">
                <ul className="flex p-4 m-4">
                    <li className="px-2">
                        Online Status: {onlineStatus ? "✅" : "🔴" }
                    </li>
                    <li className="px-2">
                        <Link to="/">Home</Link>
                    </li>
                    <li className="px-2">
                        <Link to="/about">About Us</Link>
                    </li>
                    <li className="px-2">
                        <Link to="/contact">Contact Us</Link>
                    </li>
                    <li className="px-2">
                        <Link to="/grocery">Grocery</Link>
                    </li>
                    <li className="px-2 font-bold">
                        <Link to="/cart">
                            <FontAwesomeIcon icon={faShoppingCart} />
                            Cart: {cartItems.length} items
                         </Link>
                    </li>
                    <button 
                        className="login px-2"
                        onClick={() => {
                            btnName === "Login" ?
                            setBtnName("Logout") :
                            setBtnName("Login");
                        }}
                        >{btnName}
                    </button>
                    <li className="px-4 font-bold">{loggedInUser}</li>
                </ul>
            </div>
        </div>
    );
};

export default Header;