import React from "react";
import  ReactDOM from "react-dom/client";
import Header from "./components/Header";
import Body from "./components/Body";
import About from "./components/About";
import Contact from "./components/Contact";
import Error from "./components/Error";
import RestaurantMenu from "./components/RestaurantMenu";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";

export const styleCard = {
    backgroundColor: "#f0f0f0",
};

// not using keys (not acceptable) <<<< index as a key <<<<<< unique id(best practice)

const AppLayout = () => {
    return <div className="app">
        <Header />
        <Outlet />
    </div>
}

const appRouter = createBrowserRouter([
    {
        path: "/",
        element: <AppLayout />,
        children: [
            {
                path: "/",
                element : <Body />,
            },
            {
                path: "/about",
                element : <About />,
            },
            {
                path: "/contact",
                element : <Contact />,
            },
            {
                path: "/restaurants/:resId",
                element : <RestaurantMenu />,
            },
        ],
        errorElement: <Error />,
    },
]);

const root  = ReactDOM.createRoot(document.getElementById("root"));

root.render(<RouterProvider router={appRouter} />); // rendering react functional component
