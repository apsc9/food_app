import { useState } from "react";

const User = ({ name }) => {
    const [count] = useState(0);
    const [count2]= useState(1);
    return (
        <div className="user-card">
            <h1>count ={count}</h1>
            <h1>count2 ={count2}</h1>
            <h2>name : {name}</h2>
            <h2>def</h2>
            <h3>@abc</h3>
        </div>
    )
}

export default User;