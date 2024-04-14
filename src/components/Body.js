import RestaurantCard, {withQuickDelivery} from "./RestaurantCard";
import { useState, useEffect, useContext } from "react";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import UserContext from "../utils/UserContext";

const Body = () => {

    const [ listOfRestaurants, setListOfRestaurants ] = useState([]);
    const [ filteredRestaurant, setFilteredRestaurant ] = useState([]);
    const [ searchText, setSearchText ] = useState("");

    const RestaurantCardPromoted = withQuickDelivery(RestaurantCard);

    useEffect(() => {
        fetchData();
    },[]);

    const fetchData= async () => {
        const data = await fetch(
            "https://thingproxy.freeboard.io/fetch/https://www.swiggy.com/dapi/restaurants/list/v5?lat=30.7333148&lng=76.7794179&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
        );
        //console.log(data);
        const json = await data.json();
        
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

    const { loggedInUser, setUserName } = useContext(UserContext);

    //console.log("len:", listOfRestaurants);
    return listOfRestaurants.length === 0 ? (
        <Shimmer />
    ) : (
        <div className="body">
            <div className="filter flex">
                <div className="search m-4 p-4">
                    <input type="text" 
                        className="border border-solid border-black" 
                        value={searchText}
                        onChange={(e) => {
                            setSearchText(e.target.value);
                        }}
                    />
                    <button 
                        className="px-4 py-1 bg-green-100 m-4 rounded-lg"
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
                <div className="search m-4 p-4 flex items-center">
                    <button 
                        className="px-4 py-1 bg-gray-100 m-4 rounded-lg"
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
                <div className="search m-4 p-4 flex items-center">
                    <label>Username : </label>
                    <input className="border border-black p-2" 
                        value={loggedInUser}
                        onChange={(e) => setUserName(e.target.value)}
                    />
                </div>            
            </div>
            <div className="flex flex-wrap">
                {
                    filteredRestaurant.map(restaurant => (
                        <Link 
                            key={restaurant.info.id}
                            to={"/restaurants/"+ restaurant.info.id}
                            style={{ textDecoration: 'none' }}
                        >
                            {restaurant.info.sla.deliveryTime <= 24 ? 
                            <RestaurantCardPromoted resData={restaurant}/> :
                            <RestaurantCard resData={restaurant} />
                            } 
                            
                        </Link>
                    ))
                }
            </div>
        </div>
    );
};

export default Body;