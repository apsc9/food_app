import { CDN_URL } from "../utils/constants";

const RestaurantCard = (props) => {
    const { resData } = props;

    const { 
        cloudinaryImageId, 
        name, 
        cuisines, 
        avgRating, 
        costForTwo, 
        sla, 
    } = resData?.info ;

    return (
        <div 
            data-testid="resCard"
            className="m-4 p-4 w-[230px] rounded-lg h-[550px] bg-gray-100 hover:bg-gray-200" >
            <img 
                className="rounded-lg object-cover h-56"
                alt="res-logo"
                src={CDN_URL + 
                cloudinaryImageId}
            />
            <h3 className="font-bold py-4 text-lg">{name}</h3>
            <h4>{cuisines.join(", ")}</h4>
            <h4>{avgRating} stars</h4>
            <h4>{costForTwo}</h4>
            <h4>{sla?.deliveryTime} minutes</h4>
        </div>
    );
};

// Higher order component

// input - Restaurant card ==> Restaurant card promoted

export const withQuickDelivery = (RestaurantCard) => {
    return (props) => {
        return (
            <div>
                <label className="absolute bg-black text-white m-2 px-2 py-1 rounded-lg">
                    Quick Delivery
                </label>
                <RestaurantCard {...props}/>
            </div>
        );
    };
};

export default RestaurantCard;