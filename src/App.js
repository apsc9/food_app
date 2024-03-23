import React from "react";
import  ReactDOM from "react-dom/client";
import Header from "./components/Header";
import Body from "./components/Body";

export const styleCard = {
    backgroundColor: "#f0f0f0",
};


// not using keys (not acceptable) <<<< index as a key <<<<<< unique id(best practice)

const AppLayout = () => {
    return <div className="app">
        <Header />
        <Body />
    </div>
}

const root  = ReactDOM.createRoot(document.getElementById("root"));

root.render(<AppLayout />); // rendering react functional component
