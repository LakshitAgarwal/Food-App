import { resImage_URL } from "../utils/constants";
import { motion } from "framer-motion";

const Rescard = (props) => {
  const { resData } = props;
  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{
        delay: 0.2,
        y: { type: "spring", stiffness: 60 },
        opacity: { duration: 0.2 },
        ease: "easeIn",
        duration: 1,
      }}
      className="cardDiv"
    >
      <div className="imgDiv">
        <img
          className="foodImg"
          src={resImage_URL + resData.info.cloudinaryImageId}
          alt="food"
        />
      </div>
      <div className="content">
        <h3 className="name">{resData.info.name}</h3>
        <h3>
          {"⭐️ " + resData.info.avgRating} •{" "}
          {resData.info.sla.deliveryTime + " mins"}
        </h3>
        <h4>{resData.info.cuisines.join(", ")}</h4>
        <h4>{resData.info.areaName}</h4>
      </div>
    </motion.div>
  );
};

export default Rescard;

/*
Traditional Way Of using props. Smjhne k liye likh diya, by chnc if needed later.

const Rescard = (props) => {
  return (
    <div className="cardDiv">
    <div className="imgDiv">
    <img
    className="foodImg"
    src={
      "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/" +
      props.image
    }
    alt="food"
    />
    </div>
    <div className="content">
    <h3>{props.name}</h3>
    <h3>
    {props.avgRating} • {props.deliveryTime}
    </h3>
    <h4>{props.cuisines}</h4>
    <h4>{props.areaName}</h4>
    </div>
    </div>
  );
};

function App() {
  return (
    <>
    <Navbar />
    <div className="cards">
    {resList.map((i) => (
      <Rescard
      image={i.info.cloudinaryImageId}
      name={i.info.name}
      avgRating={i.info.avgRating}
      deliveryTime={i.info.sla.deliveryTime}
      cuisines={i.info.cuisines.join(", ")}
      areaName={i.info.areaName}
      />
    ))};
    </div>
    </>
  );
}
*/
