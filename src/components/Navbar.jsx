import { useState } from "react";
import { logo_URL } from "../utils/constants";
import { Link } from "react-router-dom";
import useInternet from "../utils/useInternet";
import { useSelector } from "react-redux";

const Navbar = () => {
  const [loginButtonText, setLoginButtonText] = useState("Login");

  const isInternet = useInternet();

  // Subscribing to the store - Any chngs made in items will be reflected here automatically.
  const cartItems = useSelector((store) => {
    return store.cart.items;
  });
  console.log(cartItems);

  return (
    <div className="headerDiv">
      <Link to="/">
        <img className="logo" src={logo_URL} alt="logo here" />
      </Link>
      <ul>
        {isInternet ? <li>Internet: 🟢</li> : <li>Internet: 🔴</li>}
        <li>
          <Link to="/"> Home</Link>
        </li>
        <li>Offers</li>
        <li>
          <Link to="/about"> About Us</Link>
        </li>

        <li>
          <Link to="/cart"> Cart ({cartItems.length})</Link>
        </li>

        {/* Login Button */}
        <button
          className="loginInfo"
          // task is to change the button content from login to logout and vice versa when clicked.
          onClick={() => {
            // Conditional Ternary operator: condition ? exprIfTrue : exprIfFalse
            loginButtonText === "Login"
              ? setLoginButtonText("Logout")
              : setLoginButtonText("Login");
          }}
        >
          {loginButtonText}
        </button>
      </ul>
    </div>
  );
};

export default Navbar;
