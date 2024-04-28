import { render, screen } from "@testing-library/react";
import Contact from "../Contact";
import "@testing-library/jest-dom";

describe("Contact Us Page test cases", () => {

    // afterAll(() => {
    //     console.log("Runs after all other tests")
    // })
    
    // afterEach(() => {
    //     console.log("Runs after each test")
    // })

    it("should load contact us component", () => {
        render(<Contact />);
    
        const heading = screen.getByRole("heading");
    
        // Assertion
        expect(heading).toBeInTheDocument();
    });
    it("should load button inside the Contact component", () => {
        render(<Contact />);
    
        const button = screen.getByRole("button");
    
        // Assertion
        expect(button).toBeInTheDocument();
    });
    it("should load input name inside the Contact component", () => {
        render(<Contact />);
    
        const inputName = screen.getByPlaceholderText("name");
    
        // Assertion
        expect(inputName).toBeInTheDocument();
    });
    it("should load submit button inside the Contact component", () => {
        render(<Contact />);
    
        const option = screen.getByText("Submit");
    
        // Assertion
        expect(option).toBeInTheDocument();
    });    
    it("should load 2 input boxes on the Contact component", () => {
        render(<Contact />);
    
        // Querying 
        const inputBoxes = screen.getAllByRole("textbox");
        //console.log(inputBoxes);
        //Assertion
        expect(inputBoxes.length).toBe(2);
    });
});

