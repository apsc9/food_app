import RestaurantCard from "./RestaurantCard";
import { useState, useEffect } from "react";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";

const Body = () => {

    const [ listOfRestaurants, setListOfRestaurants ] = useState([]);
    const [ filteredRestaurant, setFilteredRestaurant ] = useState([]);
    const [ searchText, setSearchText ] = useState("");

    useEffect(() => {
        fetchData();
    },[]);

    const fetchData= async () => {
        const data = await fetch(
            "https://thingproxy.freeboard.io/fetch/https://www.swiggy.com/dapi/restaurants/list/v5?lat=30.7333148&lng=76.7794179&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
        );
        console.log(data);
        const json = await data.json();
        
        console.log(json.data.cards[1].card.card.gridElements.infoWithStyle.restaurants);
        setListOfRestaurants(json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
        setFilteredRestaurant(json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
    };

    const onlineStatus = useOnlineStatus();

    if (onlineStatus == false)
        return (
                <h1>
                    You seem to be offline. Please check your internet connection.
                </h1>
        );

    return listOfRestaurants.length === 0 ? <Shimmer /> : (
        <div className="body">
            <div className="filter">
                <div className="search">
                    <input type="text" 
                        className="search-box" 
                        value={searchText}
                        onChange={(e) => {
                            setSearchText(e.target.value);
                        }}
                    />
                    <button 
                        onClick={() => {
                            // filter the restaurant card and update the UI
                            // searchText
                            const filteredRestaurant = listOfRestaurants.filter(
                                (res) => res.info.name.toLowerCase().includes(searchText)
                            );
                            
                            setFilteredRestaurant(filteredRestaurant);
                        }}
                    >
                        Search
                    </button>
                </div>
                <button 
                    className="filter-btn"
                    onClick={() => {
                        const filteredList = listOfRestaurants.filter(
                            (res) => res.info.avgRating >= 4.4
                        );
                        setListOfRestaurants(filteredList);
                    }}
                >
                    Top Rated Restaurants
                </button>
            </div>
            <div className="res-container">
                {
                    filteredRestaurant.map(restaurant => (
                        <Link 
                            key={restaurant.info.id}
                            to={"/restaurants/"+ restaurant.info.id}
                            style={{ textDecoration: 'none' }}
                        >
                            <RestaurantCard resData={restaurant} />
                        </Link>
                    ))
                }
            </div>
        </div>
    );
};

export default Body;