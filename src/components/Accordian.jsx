import { useState } from "react";
import ItemCard from "./ItemCard";

function Accordian(props) {
  const { category } = props;
  const items = category.card.card.itemCards;
  const [showItems, setShowItems] = useState(true);
  const handleAccordian = () => {
    setShowItems(!showItems);
  };

  return (
    <div className="accordian">
      <div className="accordian-banner" onClick={handleAccordian}>
        <div className="accordian-header">
          {category.card.card.title} ({category.card.card.itemCards.length})
        </div>
        {showItems ? (
          <div className="accordian-arrow">⬆️</div>
        ) : (
          <div className="accordian-arrow">⬇️</div>
        )}
      </div>
      {showItems ? (
        <div className="menu-items">
          {items.map((item, index) => (
            <ItemCard key={index} itemData={item} />
          ))}
        </div>
      ) : null}
    </div>
  );
}

export default Accordian;
