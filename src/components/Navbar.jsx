import { useState } from "react";
import { logo_URL } from "../utils/constants";
import { Link } from "react-router-dom";
import useInternet from "../utils/useInternet";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
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
        <motion.img
          initial={{ x: -70, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{
            delay: 0.2,
            x: { type: "spring", stiffness: 50 },
            opacity: { duration: 0.2 },
            ease: "easeIn",
            duration: 1,
          }}
          className="logo"
          src={logo_URL}
          alt="logo here"
        />
      </Link>
      <ul>
        {isInternet ? (
          <motion.li
            initial={{ x: -70, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{
              delay: 0.2,
              x: { type: "spring", stiffness: 60 },
              opacity: { duration: 0.2 },
              ease: "easeIn",
              duration: 1,
            }}
          >
            Internet: 🟢
          </motion.li>
        ) : (
          <motion.li
            initial={{ x: -70, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{
              delay: 0.2,
              x: { type: "spring", stiffness: 60 },
              opacity: { duration: 0.2 },
              ease: "easeIn",
              duration: 1,
            }}
          >
            Internet: 🔴
          </motion.li>
        )}
        <motion.li
          initial={{ x: -70, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{
            delay: 0.2,
            x: { type: "spring", stiffness: 60 },
            opacity: { duration: 0.4 },
            ease: "easeIn",
            duration: 3,
          }}
        >
          <Link to="/"> Home</Link>
        </motion.li>
        <motion.li
          initial={{ x: -70, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{
            delay: 0.2,
            x: { type: "spring", stiffness: 60 },
            opacity: { duration: 0.6 },
            ease: "easeIn",
            duration: 5,
          }}
        >
          Offers
        </motion.li>
        <motion.li
          initial={{ x: -70, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{
            delay: 0.2,
            x: { type: "spring", stiffness: 60 },
            opacity: { duration: 0.8 },
            ease: "easeIn",
            duration: 7,
          }}
        >
          <Link to="/about"> About Us</Link>
        </motion.li>

        <motion.li
          initial={{ x: -70, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{
            delay: 0.2,
            x: { type: "spring", stiffness: 60 },
            opacity: { duration: 0.8 },
            ease: "easeIn",
            duration: 9,
          }}
        >
          <Link to="/cart"> Cart ({cartItems.length})</Link>
        </motion.li>

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
