import Rescard from "./Rescard";
import { useEffect, useState } from "react";
import Shimmer from "./Shimmer";
import { RES_API_URL } from "../utils/constants";
import { Link } from "react-router-dom";
import useInternet from "../utils/useInternet";
import Offline from "./Offline";

const API_URL = RES_API_URL;

function Body() {
  const [searchText, setSearchText] = useState("");
  const [rawData, setrawData] = useState([]);
  const [filterData, setFilterData] = useState([]);

  // fetching data from API
  async function fetchData() {
    const data = await fetch(API_URL);
    const jsonData = await data.json();
    setrawData(
      jsonData?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle
        ?.restaurants
    );
    setFilterData(
      jsonData?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle
        ?.restaurants
    );
    console.log(jsonData);
  }

  useEffect(() => {
    fetchData();
  }, []);

  const internetStatus = useInternet();
  if (internetStatus == false) {
    return <Offline />;
  } else {
    if (rawData.length === 0) {
      return <Shimmer />;
    }
    return (
      <>
        <div className="search-and-filter">
          {/* Search Box */}
          <div className="search-container">
            <input
              type="text"
              className="search-input"
              placeholder="Search..."
              value={searchText}
              onChange={(e) => {
                setSearchText(e.target.value);
              }}
            />
            <button
              className="search-button"
              onClick={() => {
                const searchedList = rawData.filter((resName) => {
                  return resName.info.name
                    .toLowerCase()
                    .includes(searchText.toLowerCase());
                });
                setFilterData(searchedList);
              }}
            >
              <i className="fas fa-search"></i>
            </button>
          </div>

          {/* Button to filter top rated restaurants */}
          <button
            className="filter-btn"
            onClick={() => {
              let filteredList = rawData.filter(
                (resNumber) => resNumber.info.avgRating > 4.5
              );
              //Earlier it was setRawData(filteredList) nut after making the search function we made two lists the search function is getting performed on Rawdata and the the filtered Rawadata is passed to setFilteredData and then the rendering is happening on FilteredData so we changed it here as well as we need to pass the top restauants ki filtered list to the function that is being rendered.
              setFilterData(filteredList);
            }}
          >
            Show top rated restaurants
          </button>
        </div>

        <div className="cards">
          {filterData.map((restaurantNumber) => (
            <Link
              key={restaurantNumber.info.id}
              to={"/restaurants/" + restaurantNumber.info.id}
            >
              <Rescard resData={restaurantNumber} />
            </Link>
          ))}
        </div>
      </>
    );
  }
}

export default Body;
