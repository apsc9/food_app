import Shimmer from "./Shimmer";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { MENU_API } from "../utils/constants";
import useRestaurantMenu from "../utils/useRestaurantMenu";
import RestaurantCategory from "./RestaurantCategory";

const RestaurantMenu = () => {

    const { resId } = useParams();

    const resInfo = useRestaurantMenu(resId);  

    const [showIndex, setShowIndex] = useState(null);
    
    if (resInfo === null) return <Shimmer />

    const { name, cuisines, costForTwoMessage } = resInfo?.cards[2]?.card?.card?.info || {}; 

    const {itemCards} = resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[2]?.card?.card;

    const categories = 
        resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(
            (c) => 
                c.card?.card?.["@type"] === 
                "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
        );

    //console.log(categories);

    const toggleAccordion = (index) => {
        setShowIndex((prevIndex) => (prevIndex === index ? null : index));
      };
            

    return (
        <div className="text-center">
            <h1 className="font-bold my-6 text-3xl">{name}</h1>
            <p className="font-bold text-lg">
                {cuisines.join(", ")} - {costForTwoMessage}
            </p>
            {/* categories accordians */}
            {categories.map((category, index) => (
                // controlled component
                <RestaurantCategory 
                    key={category?.card?.card?.title} 
                    data={category?.card?.card}
                    showItems={index === showIndex }
                    //setShowIndex={() => setShowIndex(index)}
                    toggleAccordion={() => toggleAccordion(index)}
                />
            ))}
        </div>
    );
};

export default RestaurantMenu;