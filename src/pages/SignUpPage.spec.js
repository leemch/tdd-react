const { render, screen } = require("@testing-library/react")
import SignUpPage from "./SignUpPage";
import userEvent from "@testing-library/user-event";
//import axios from "axios";
import { setupServer } from "msw/node";
import { rest } from "msw";

describe("Sign Up Page", () => {
    describe("Layout", () => {
        it("has header", () => {
            render(<SignUpPage />);
            const header = screen.queryByRole("heading", { name: "Sign Up" });
            expect(header).toBeInTheDocument();
        });
        it("has username input", () => {
            render(<SignUpPage />);
            const input = screen.getByLabelText("Username");
            expect(input).toBeInTheDocument();
        })
        it("has email input", () => {
            render(<SignUpPage />);
            const input = screen.getByLabelText("Email");
            expect(input).toBeInTheDocument();
        })
        it("has password input", () => {
            render(<SignUpPage />);
            const input = screen.getByLabelText("Password");
            expect(input).toBeInTheDocument();
        })
        it("has password type for password input", () => {
            render(<SignUpPage />);
            const input = screen.getByLabelText("Password");
            expect(input.type).toBe("password");
        })
        it("has password repeat input", () => {
            render(<SignUpPage />);
            const input = screen.getByLabelText("Repeat Password");
            expect(input).toBeInTheDocument();
        })
        it("has password type for repeat password input", () => {
            render(<SignUpPage />);
            const input = screen.getByLabelText("Repeat Password");
            expect(input.type).toBe("password");
        })
        it("has Sign Up button", () => {
            render(<SignUpPage />);
            const button = screen.queryByRole("button", { name: "Sign Up" });
            expect(button).toBeInTheDocument();
        });
        it("disables the button by default", () => {
            render(<SignUpPage />);
            const button = screen.queryByRole("button", { name: "Sign Up" });
            expect(button).toBeDisabled();
        });
    });
    describe("interactions", () => {

        let button;

        const setUpPage = () => {
            render(<SignUpPage />);
            const usernameInput = screen.getByLabelText("Username");
            const emailInput = screen.getByLabelText("Email");
            const passwordInput = screen.getByLabelText("Password");
            const passwordRepeat = screen.getByLabelText("Repeat Password");

            userEvent.type(usernameInput, "lee123");
            userEvent.type(emailInput, "poopoo@gmail.com");
            userEvent.type(passwordInput, "poopoo");
            userEvent.type(passwordRepeat, "poopoo");

            button = screen.queryByRole("button", { name: "Sign Up" });
        }

        it("enables button when password and password repeat have the same value", () => {
            setUpPage();
            expect(button).toBeEnabled();
        })
        it("sends username, email, and password after pressing the button", async () => {
            let reqBody;
            const server = setupServer(
                rest.post("/api/1.0/users", (req, res, ctx) => {
                    reqBody = req.body;
                    return res(ctx.status(200));
                })
            );

            server.listen();
            setUpPage();
            userEvent.click(button);
            await new Promise((resolve) => setTimeout(resolve, 500));

            expect(reqBody).toEqual({
                username: "lee123",
                email: "poopoo@gmail.com",
                password: "poopoo"
            })
        })

        it("disables button when there is an ongoing api call", async () => {
            let counter = 0;
            const server = setupServer(
                rest.post("/api/1.0/users", (req, res, ctx) => {
                    counter++;
                    return res(ctx.status(200));
                })
            );

            server.listen();
            setUpPage();
            userEvent.click(button);
            userEvent.click(button);
            await new Promise((resolve) => setTimeout(resolve, 500));
            expect(counter).toBe(1);
        });

        it("displays spinner after clicking submit", async () => {
            let counter = 0;
            const server = setupServer(
                rest.post("/api/1.0/users", (req, res, ctx) => {
                    counter++;
                    return res(ctx.status(200));
                })
            );

            server.listen();
            setUpPage();
            expect(screen.queryByRole("status")).not.toBeInTheDocument();
            userEvent.click(button);
            const spinner = screen.getByRole("status");
            expect(spinner).toBeInTheDocument();
        });
    })
})

