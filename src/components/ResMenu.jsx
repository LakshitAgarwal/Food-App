import { useEffect, useState } from "react";
import { MENU_URL } from "../utils/constants";
import Shimmer from "./Shimmer";
import ItemCard from "./ItemCard";
import { ICON_URL } from "../utils/constants";
import { useParams } from "react-router-dom";
import Accordian from "./Accordian";

function ResMenu() {
  const [menuInfo, setMenuInfo] = useState(null);

  useEffect(() => {
    fetchMenu();
  }, []);

  const restaurantId = useParams();

  // fetching menu data
  async function fetchMenu() {
    const menuData = await fetch(MENU_URL + restaurantId.resId);
    const menuJson = await menuData.json();
    // console.log(menuJson);
    setMenuInfo(menuJson);
  }

  if (menuInfo === null) {
    return <Shimmer />;
  }

  const menuItems =
    // Some restaurants had different nomenclature in there API isliye 2-3 tarah se menuItems define krne pade
    menuInfo?.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[1]?.card
      ?.card?.itemCards ||
    menuInfo?.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[2]?.card
      ?.card?.itemCards ||
    menuInfo?.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[2]?.card
      ?.card?.categories[0].itemCards;

  const categories =
    menuInfo?.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(
      (c) => {
        return (
          c.card?.card?.["@type"] ==
          "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
        );
      }
    );
  // console.log(categories);

  // Sundarta k liye gpt se likhvaya hai ignore
  const stripHtmlTags = (str) => {
    if (!str) return "";
    return str.replace(/<\/?b>/g, "");
  };

  return (
    <div>
      <h1 className="restaurant-name">
        {menuInfo?.data?.cards[2]?.card?.card?.info.name}
      </h1>

      {/* Restaurant Info Card */}
      <div className="info-card">
        <div className="rating-info">
          <p className="rating-number-info">
            &#9733;
            {menuInfo?.data?.cards[2]?.card?.card?.info?.avgRating}
          </p>
          <p className="total-ratings-info">
            ({menuInfo?.data?.cards[2]?.card?.card?.info?.totalRatingsString})
          </p>
          <p>•</p>
          <p className="cost-for-two-info">
            {menuInfo?.data?.cards[2]?.card?.card?.info?.costForTwoMessage}
          </p>
        </div>
        <p className="cuisines-info">
          {menuInfo?.data?.cards[2]?.card?.card?.info?.cuisines?.join(", ")}
        </p>
        <p className="delivery-time-info">
          {menuInfo?.data?.cards[2]?.card?.card?.info?.sla.minDeliveryTime}-
          {menuInfo?.data?.cards[2]?.card?.card?.info?.sla.maxDeliveryTime} mins
        </p>
        <div className="delivery-info">
          <img
            className="delivery-icon"
            src={
              ICON_URL +
              menuInfo?.data?.cards[2]?.card?.card?.info?.feeDetails.icon
            }
            alt="delivery"
          />
          <p className="delivery-text-info">
            {/* Sundarta k liye gpt se ek function likhvaya hai! IGNORE */}
            {stripHtmlTags(
              menuInfo?.data?.cards[2]?.card?.card?.info?.feeDetails.message
            )}
          </p>
        </div>
      </div>
      <h2 className="menu-heading">Menu</h2>

      {categories.map((cat) => {
        return <Accordian key={cat.card.card.title} category={cat} />;
      })}
    </div>
  );
}

export default ResMenu;
