import ItemList from "./ItemList";
import {useState} from "react";

const RestaurantCategory = ({ data, showItems, toggleAccordion }) => {

    // const handleClick= () => {
    //     setShowIndex();
    // };

    return (
        <div>
            {/* Accordian Header */}
            <div className="w-6/12 mx-auto my-4 bg-gray-100 shadow-lg p-2">
                <div 
                    className="flex justify-between cursor-pointer" 
                    onClick={toggleAccordion}
                >
                    <span className="font-bold text-lg">
                        {data.title} ({data.itemCards.length})
                    </span>
                    <span>
                        {showItems ? '▲' : '▼'}
                    </span>
                    {/* <img width="25" height="25" src="https://img.icons8.com/ios/50/circled-chevron-down.png" alt="circled-chevron-down"/> */}
                </div>
                {/* Accordian Body */}

                {showItems && <ItemList items={data.itemCards}/>}
            </div>
        </div>
    );
};

export default RestaurantCategory;