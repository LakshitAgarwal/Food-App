import { useDispatch, useSelector } from "react-redux";
import ItemCard from "./ItemCard";
import { clearCart } from "../utils/cartSlice";

function Cart() {
  const cartItems = useSelector((store) => {
    return store.cart.items;
  });
  console.log(cartItems);

  const dispatch = useDispatch();
  const handleClearCart = () => {
    dispatch(clearCart());
  };

  return (
    <>
      <div className="cart">Cart</div>;
      <div className="added-items">
        {cartItems.map((i) => {
          return <ItemCard itemData={i} />;
        })}
      </div>
      <div className="clear-cart-container">
        {cartItems.length != 0 ? (
          <button className="clear-cart" onClick={handleClearCart}>
            Clear Cart
          </button>
        ) : null}
      </div>
    </>
  );
}

export default Cart;
