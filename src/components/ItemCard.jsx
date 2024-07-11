import { useDispatch } from "react-redux";
import { itemImage_URL } from "../utils/constants";
import { addItem } from "../utils/cartSlice";

function ItemCard({ itemData }) {
  const dispatch = useDispatch();
  const handleAddItem = (itemToBeAdded) => {
    dispatch(addItem(itemToBeAdded));
  };

  const rating = itemData?.card?.info?.ratings?.aggregatedRating?.rating;
  const ratingCount =
    itemData?.card?.info?.ratings?.aggregatedRating?.ratingCountV2;

  return (
    <div className="menu-container">
      <div className="written-info">
        {itemData?.card?.info?.itemAttribute.vegClassifier === "NONVEG" ? (
          <span className="nonveg">🔺</span>
        ) : (
          <span className="veg">🟢</span>
        )}
        <h3 className="item-name">{itemData?.card?.info?.name}</h3>
        <p className="item-price">
          ₹
          {itemData?.card?.info?.defaultPrice / 100 ||
            itemData?.card?.info?.finalPrice / 100 ||
            itemData?.card?.info?.price / 100}
        </p>

        {rating && ratingCount ? (
          <p className="item-rating">
            &#9733; {rating} ({ratingCount})
          </p>
        ) : null}
        <p className="item-description">{itemData?.card?.info?.description}</p>
      </div>
      <div className="item-img">
        <img
          src={itemImage_URL + itemData?.card?.info?.imageId}
          alt="food"
          className="food-image"
        />
        <button className="add-to-cart" onClick={() => handleAddItem(itemData)}>
          ADD
        </button>
      </div>
    </div>
  );
}

export default ItemCard;
