import ItemList from "./ItemList";
import {useState} from "react";

const RestaurantCategory = ({ data }) => {

    const [ showItems, setShowItems ] = useState(false);
    
    const handleClick = () => {
        setShowItems(!showItems);
    };
    return (
        <div>
            {/* Accordian Header */}
            <div className="w-6/12 mx-auto my-4 bg-gray-100 shadow-lg p-2">
                <div className="flex justify-between cursor-pointer" onClick={handleClick}>
                    <span className="font-bold text-lg">
                        {data.title} ({data.itemCards.length})
                    </span>
                    <span className="text-2xl align-text-bottom">⌄</span>
                </div>
                {/* Accordian Body */}

                {showItems && <ItemList items={data.itemCards}/>}
            </div>
        </div>
    );
};

export default RestaurantCategory;