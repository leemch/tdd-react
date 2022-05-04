import { render, screen } from "@testing-library/react";
import App from './App.js';


describe("routing", () => {
    it("displays homepage at /", () => {
        render(<App />);
        const homePage = screen.getByTestId("home-page");
        expect(homePage).toBeInTheDocument();
    })
})