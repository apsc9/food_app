import { act } from "react-dom/test-utils";
import { render, screen, fireEvent } from "@testing-library/react";
import RestaurantMenu from "../RestaurantMenu";
import Header from "../Header";
import Cart from "../Cart";
import MOCK_DATA from "../mocks/mockResMenu.json";
import { Provider } from "react-redux";
import appStore from "../../utils/appStore";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";

global.fetch = jest.fn(() => 
    Promise.resolve({
        json: () => Promise.resolve(MOCK_DATA)
    })
);

it("should load Restaurant Menu component", async () => {
    await act(async () => 
        render(
            <BrowserRouter>
                <Provider store={appStore}>
                    <Header />
                    <RestaurantMenu />
                    <Cart />
                </Provider>
            </BrowserRouter>    
    ));

    const accordianHeader = screen.getByText("Recommended (2)");
    fireEvent.click(accordianHeader);

    const items = screen.getAllByTestId("foodItems");
    expect(items.length).toBe(2);
    
    // before adding the items, we expect the cart to have 0 items
    expect(screen.getByText("Cart: 0 items")).toBeInTheDocument();

    const addBtns = screen.getAllByRole("button", { name: "Add +" });
    fireEvent.click(addBtns[0]);
    fireEvent.click(addBtns[1]);

    expect(screen.getByText("Cart: 2 items")).toBeInTheDocument();

    expect(screen.getAllByTestId("foodItems").length).toBe(4);

    fireEvent.click(screen.getByRole("button", { name: "Clear Cart" }));

    expect(screen.getAllByTestId("foodItems").length).toBe(2);

    expect(screen.getByText("Your Cart is empty. Please add items to the cart")).toBeInTheDocument();
});